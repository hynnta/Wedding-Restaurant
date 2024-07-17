from django.contrib import admin
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Sanh, User, LoaiSanh, DichVu, Menu


class SanhForm(forms.ModelForm):
    ghi_chu = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Sanh
        fields = '__all__'


class SanhAdmin(admin.ModelAdmin):
    form = SanhForm
    list_display = ["ten", "created_date", "active", "loai"]
    search_fields = ["ten", "loai__ten"]
    list_filter = ["created_date", "loai__ten"]
    readonly_fields = ["img"]

    def img(self, sanh):
        if sanh:
            return mark_safe("<img src='/static/{url}' alt='{alt}' width='135px' />"
                             .format(url=sanh.image.name, alt=sanh.ten))


class SanhInLine(admin.StackedInline):
    model = Sanh
    pk_name = 'loai'


class LoaiAdmin(admin.ModelAdmin):
    inlines = (SanhInLine, )


class DichVuAdmin(admin.ModelAdmin):
    list_display = ["ten", "gia", "active"]
    search_fields = ["ten", "gia"]
    list_filter = ["gia"]
    readonly_fields = ["img"]

    def img(self, dichvu):
        if dichvu:
            return mark_safe("<img src='/static/{url}' alt='{alt}' width='135px' />"
                             .format(url=dichvu.image.name, alt=dichvu.ten))


class UserAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "email", "is_active", "is_customer", "is_employee"]
    list_filter = ["is_active", "is_customer", "is_employee"]


admin.site.register(Menu)
admin.site.register(User, UserAdmin)
admin.site.register(Sanh, SanhAdmin)
admin.site.register(LoaiSanh, LoaiAdmin)
admin.site.register(DichVu, DichVuAdmin)



