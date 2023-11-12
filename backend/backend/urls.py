from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
    TokenVerifyView,
)
from appointments.views import (
    FetchPatientAppointData,
    FetchDoctorAppointData,
    FetchAllAppointData,
    AppointmentPrescription,
    FetchExecutiveDashboardData,
    FetchDoctorDashboardData,
)
from authentication.views import (
    AllAccountListView,
    AddAccount,
    AccountSignup,
    AccountLogin,
    LogoutView,
    ChangePassword,
    ActivateUser,
)
from chat.views import (
    ChatAPI,
    MyInbox,
    GetMessages,
    SendMessages
)
from doctors_and_labs.views import (
    DoctorAvailabilityRegistration,
    DoctorAccountDetails,
    GetListOfSpecialization,
    DoctorSpecificSpecialization,
    DoctorsListAtSpecialization,
)
from executives.views import AccountApproval
from patients.views import (
    GetPatientProfileDetails,
    PatchProfileDetails,
    FetchAvailableTimingDoctor,
)
from payments.views import (
    CheckoutPayment,
    RazorpayOrder,
    RazorpayOrderComplete,
    GetExecutivePaymentList,
    GetDoctorPaymentList,
    GetPatientPaymentList,
)
from reports.views import ProfileImage



urlpatterns = [
    path('admin/', admin.site.urls),

#JWT Refresh and access tokens
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # for obtaining access tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # for refreshing tokens
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

#Authentication
    # View all user data
    path('api/', AllAccountListView.as_view(), name='all-account-list'),

    # Signup, Login, and Logout API endpoints
    # Add account, Patient, Doctor, Lab, Executive accounts
    path('api/add/', AddAccount.as_view(), name='add-account'),
    path('api/account-signup', AccountSignup.as_view(), name='account-signup'),
    path('api/account-login', AccountLogin.as_view(), name='patient-login'),
    path('api/logout', LogoutView.as_view(), name='logout-view'),
    path('api/change-password', ChangePassword.as_view(), name='change-password'),

    # Activate user by Executive
    path('api/activate-user', ActivateUser.as_view(), name='activate-user'),

#Executive
    path('api/account-approval', AccountApproval.as_view(), name='account_approval'),


#Appointments
    # Get appointments
    path('api/fetch-patient-appointments', FetchPatientAppointData.as_view(), name='fetch_patient_appointments'),
    path('api/fetch-doctor-appointments', FetchDoctorAppointData.as_view(), name='fetch_doctor_appointments'),
    path('api/fetch-all-appointments', FetchAllAppointData.as_view(), name='fetch_all_appointments'),

    # Get and patch prescription
    path('api/fetch-prescription', AppointmentPrescription.as_view(), name='fetch-prescription'),
    path('api/patch-prescription', AppointmentPrescription.as_view(), name='fetch-prescription'),
    path('api/fetch-patient-prescription', AppointmentPrescription.as_view(), name='fetch-patient-prescription'),

    # Get data for dashboard
    path('api/fetch-executive-dashboard-data', FetchExecutiveDashboardData.as_view(), name='fetch-executive-dashboard-data'),
    path('api/fetch-doctor-dashboard-data', FetchDoctorDashboardData.as_view(), name='fetch-doctor-dashboard-data'),

#Chat
    path('api/chat', ChatAPI.as_view(), name='chat-api-view'),
    path('api/my-messages/<user_id>', MyInbox.as_view()),
    path("api/get-messages/<sender_id>/<reciever_id>", GetMessages.as_view()),
    path("api/send-messages", SendMessages.as_view()),

#Doctors and Labs
    # Get doctor availability
    path('api/doctor-availability-get-url', DoctorAvailabilityRegistration.as_view(), name='doctor-availability-get-url'),
    # Get and Patch doctor account details
    path('api/get-doctor-account-details', DoctorAccountDetails.as_view(), name='doctor_account_details'),
    # Get and Post doctor specialization details
    path('api/doctor-specialization-generic-url', GetListOfSpecialization.as_view(), name='doctor_specialization_url'),
    # Specific url for getting a doctor's specialization details
    path('api/doctor-specialization-specific', DoctorSpecificSpecialization.as_view(), name='doctor_specialization_specific'),

    # Fetch available doctors on a particular specialization
    path('api/doctors-at-specific-specialization/', DoctorsListAtSpecialization.as_view(), name='doctors-at-specialization'),

#Patients
    # Get patient profile details from 'Account' model
    path('api/get-patient-profile-details', GetPatientProfileDetails.as_view(), name='get-patient-profile-detials'),
    path('api/patch-profile-details', PatchProfileDetails.as_view(), name='patch-profile-detials'),

    # Get available timing of doctors
    path('api/fetch-per-day-availability-of-specialized-doctor/', FetchAvailableTimingDoctor.as_view(), name='fetch-per-day-availability-of-sepecialized-doctor'),

#Payments
    # Razorpay payment testing
    path('api/checkout_payment', CheckoutPayment.as_view(), name='checkout-payment'),
    path('api/razorpay/order/create', RazorpayOrder.as_view(), name='razorpay-order-create'),
    path('razorpay/order/complete', RazorpayOrderComplete.as_view(), name='razorpay-order-complete'),

    #Payment list fetching
    path('api/fetch-executive-payments', GetExecutivePaymentList.as_view(), name='fetch-executive-payments'),
    path('api/fetch-doctor-payments', GetDoctorPaymentList.as_view(), name='fetch-doctor-payments'),
    path('api/fetch-patient-payments', GetPatientPaymentList.as_view(), name='fetch-patient-payments'),

#Reports
    # File upload
    path('api/upload-profile-image', ProfileImage.as_view(), name='upload-profile-image'),

]
