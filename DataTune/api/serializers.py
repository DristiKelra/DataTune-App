# serializers.py
from rest_framework import serializers
from .models import UploadedData

class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = '__all__'
