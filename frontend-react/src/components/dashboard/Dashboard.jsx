import React,{useEffect,useState} from 'react'
import axiosInstance from '../../axiosinstance'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

export const Dashboard = () => {
    const [ticker,setTicker] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState('')
    const [ma100, setMA100] = useState('')
    const [ma200, setMA200] = useState('')


    useEffect(() =>{
        const fetchProtectedData = async () =>{
            try{
                const response = await axiosInstance.get('/protected-view/')
                console.log('success:', response.data)
            }catch(error){
                console.error('Error Fetching Data:', error)
            }
        }
        fetchProtectedData();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setError(null)
        try{
            const response = await axiosInstance.post('/predict/',{
                ticker: ticker
            });
            console.log(response.data);
            // set plot
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plot_url = `${backendRoot}${response.data.plot_img}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`

            console.log(plot_url)
            setPlot(plot_url)
            setMA100(ma100Url)
            setMA200(ma200Url)

            if(response.data.error){
                setError(response.data.error)
            }
        }catch(error){
            console.error('There was an error making the API request', error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-6 mx-auto">
                <form onSubmit={handleSubmit}>
                    <input type="text"  className="form-control" placeholder='Enter Stock Ticker' onChange={(e) => setTicker(e.target.value) } required/>
                    <small>{error && <div className='text-danger mt-1'>{error}</div>}</small>
                    <button type='submit' className='btn btn-info mt-3'>
                        {loading ? <span><FontAwesomeIcon icon={faSpinner} spin/> Loading...</span> : 'See Prediction'}
                    </button>
                </form>
            </div>

            {/* print prediction plots */}
            <div className='prediction mt-5'>
                <div className='p-4'>
                    {plot && (<img src={plot} style={{maxWidth:'100%'}}/>)}
                </div>

                <div className='p-4'>
                    {ma100 && (<img src={ma100} style={{maxWidth:'100%'}}/>)}
                </div>

                <div className='p-4'>
                    {ma200 && (<img src={ma200} style={{maxWidth:'100%'}}/>)}
                </div>
            </div>

        </div>
    </div>
  )
}
