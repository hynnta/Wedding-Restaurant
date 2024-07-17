from django.contrib.auth.models import AbstractUser
from django.db import models
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(null=False, upload_to='users/%Y/%m')
    is_customer = models.BooleanField(default=True)
    is_employee = models.BooleanField(default=False)


class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class LoaiSanh(ModelBase):
    ten = models.CharField(max_length=50, unique=True)
    gia_sang = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    gia_trua = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    gia_toi = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    gia_cuoi_tuan = models.DecimalField(default=0, decimal_places=2, max_digits=10)

    def __str__(self):
        return self.ten


class Sanh(ModelBase):
    ten = models.CharField(max_length=100, null=False)
    sl_ban_max = models.IntegerField(null=False)
    image = models.ImageField(null=True, blank=True, upload_to='sanhs/%Y/%m')
    ghi_chu = RichTextField()
    loai = models.ForeignKey(LoaiSanh, related_name="sanhs", null=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ('ten', 'loai')

    def __str__(self):
        return self.ten


class Menu(ModelBase):
    ten = models.CharField(max_length=100, null=False)
    khai_vi = models.CharField(max_length=50, null=False)
    mon_sup = models.CharField(max_length=50, null=False)
    mon_chinh1 = models.CharField(max_length=50, null=False)
    mon_chinh2 = models.CharField(max_length=50, null=False)
    mon_chinh3 = models.CharField(max_length=50, null=False)
    trang_mieng = models.CharField(max_length=50, null=False)
    image = models.ImageField(null=True, blank=True, upload_to='menus/%Y/%m')

    def __str__(self):
        return self.ten


class DichVu(ModelBase):
    ten = models.CharField(max_length=100, null=False)
    gia = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    image = models.ImageField(null=True, blank=True, upload_to='dichvus/%Y/%m')

    def __str__(self):
        return self.ten


class TiecCuoi(ModelBase):
    sanh = models.ForeignKey(Sanh, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="tieccuois", on_delete=models.CASCADE)
    dichvus = models.ManyToManyField(DichVu)
    sl_ban = models.IntegerField(null=False)
    ngay_to_chuc = models.DateTimeField()
    ten_chu_re = models.CharField(max_length=100, null=False)
    ten_co_dau = models.CharField(max_length=100, null=False)

    class Meta:
        unique_together = ('sanh', 'ngay_to_chuc')


class Report(ModelBase):
    content = models.TextField()
    tieccuoi = models.ForeignKey(TiecCuoi, related_name='reports', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class ChiTietHoaDon(ModelBase):
    tieccuoi = models.ForeignKey(TiecCuoi, related_name='chitiethoadon', on_delete=models.CASCADE)
    thanh_tien = models.FloatField(default=0)


class HoaDon(ModelBase):
    ngay_tao = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chi_tiet_hoa_don = models.OneToOneField(ChiTietHoaDon, related_name='hoadon', on_delete=models.CASCADE)

