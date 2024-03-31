# models.py 
from django.db import models

class UploadedData(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Uploaded Data {self.file}"

    class Meta:
        verbose_name_plural = "Uploaded Data"


class DataHandleModel(models.Model):
    field1 = models.CharField(max_length=100, null=True, blank=True)
    field2 = models.IntegerField(null=True, blank=True)


class DynamicData(models.Model):
    data = models.JSONField()


class DataTune(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    removed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural ='Data Tunes'

