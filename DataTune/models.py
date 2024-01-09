from django.db import models

# models.py
from django.db import models

class DataHandleModel(models.Model):
    field1 = models.CharField(max_length=100, null=True, blank=True)
    field2 = models.IntegerField(null=True, blank=True)
    # Add more fields as per your data


class DynamicData(models.Model):
    data = models.JSONField()



class UploadedData(models.Model):
    file = models.FileField(upload_to='uploads/')
    upload_date = models.DateTimeField(auto_now_add=True)
    # Add more fields as needed

    def __str__(self):
        return f"Uploaded Data {self.file}"

    class Meta:
        verbose_name_plural = "Uploaded Data"


# Create your models here.

class DataTune(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    removed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural ='Data Tunes'

