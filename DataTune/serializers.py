# serializers.py
from rest_framework import serializers
<<<<<<< HEAD
from DataTune.models import UploadedData
=======
from .models import UploadedData
>>>>>>> origin/master

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = ['id', 'file', 'uploaded_at']
