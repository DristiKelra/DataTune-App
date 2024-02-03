# serializers.py
from rest_framework import serializers
from .models import UploadedData

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = ['id', 'file', 'uploaded_at']
