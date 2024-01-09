from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DataViewSet

Upload_router = DefaultRouter()
Upload_router.register(r'uploadData', DataViewSet)

