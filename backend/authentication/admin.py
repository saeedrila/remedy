from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authentication.models import Account


class AccountAdmin(UserAdmin):
	list_display = ('email','username','date_joined','last_login','is_executive','is_doctor','is_lab','is_patient','is_admin','is_staff')
	search_fields = ('email','username')
	readonly_fields=('date_joined', 'last_login')

	filter_horizontal = ()
	list_filter = ()
	fieldsets = ()

admin.site.register(Account, AccountAdmin)
