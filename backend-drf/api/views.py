from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot


# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
           
            if df.empty:
                return Response({'error':"No data found for the given ticker.",
                                'status' : status.HTTP_404_NOT_FOUND})
            

            # Generate basic Plot
            df = df.droplevel(1,axis=1)
            df = df.reset_index()

            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label ='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            # save the plot to a file
            plot_img_path = f'{ticker}_plot.png' # this is image path
            # image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path) #this is for server path
            # plt.savefig(image_path)
            # plt.close()
            # plot_img = settings.MEDIA_URL + plot_img_path
            plot_img = save_plot(plot_img_path)
            # print(plot_img)

            # 100 days moving average
            ma100 = df['Close'].rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label ='Closing Price')
            plt.plot(ma100, 'r', label = '100 DMA')
            plt.title(f'100 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)

            # 200 days moving average
            ma200 = df['Close'].rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label ='Closing Price')
            plt.plot(ma100, 'r', label = '100 DMA')
            plt.plot(ma200, 'g', label = '200 DMA')
            plt.title(f'200 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_200_dma.png'
            plot_200_dma = save_plot(plot_img_path)

            return Response({
                'status': 'success', 
                'plot_img': plot_img,
                'plot_100_dma' : plot_100_dma,
                'plot_200_dma' : plot_200_dma,
                })
