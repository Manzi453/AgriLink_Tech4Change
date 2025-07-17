mport i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to AgriLink Rwanda",
          login: "Login",
          signupLabel: "Sign Up",
         
          auth: {
            title: "Login / Sign up",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            loginButton: "Login",
            createAccount: "Create an account",
            farmerQuestion: "Are you a farmer?",
            requestMembership: "Request membership",
            noAccount: "Don't have an account?"
          },
          signup: {
            title: "Create Account",
            namePlaceholder: "Full Name",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            confirmPasswordPlaceholder: "Confirm Password",
            submitButton: "Sign Up",
            haveAccount: "Already have an account?",
            login: "Login"
          },
          membership: {
            title: "Farmer Membership",
            subtitle: "Join our farming community",
            farmNamePlaceholder: "Farm Name",
            locationPlaceholder: "Location",
            sizePlaceholder: "Farm Size (acres)",
            cropsPlaceholder: "Main Crops",
            emailPlaceholder: "Email",
            phonePlaceholder: "Phone Number",
            submitButton: "Submit Application",
            alreadyMember: "Already a member?",
            loginInstead: "Login here"
          },
          dashboard: {
            greeting: "Hello, Farmer!",
            dashboard: "Dashboard",
            settings: "Settings",
            myCrops: "My Crops",
            messages: "Messages",
            reports: "Reports",
            logout: "Logout",
            addCrop: "Add Crop",
            edit: "Edit",
            delete: "Delete",
            editCrop: "Edit Crop",
            cropName: "Crop Name",
            quantity: "Quantity",
            price: "Price",
            description: "Description",
            image: "Image",
            save: "Save",
            update: "Update",
            cancel: "Cancel",
            available: "Available"
          },
          settings: {
            profile: "Profile",
            manageProfile: "Manage your profile information",
            notifications: "Notifications",
            manageNotifications: "Configure notification preferences",
            security: "Security",
            changePassword: "Change your password",
            configure: "Configure",
            update: "Update"
          },
          appName: "AGRILINK",
          units: {
            kg: "Kg",
            rwfPerKg: "RWF/kg"
          },
          home: {
            navHome: "Home",
            featuredProducts: "Featured Products",
            buyNow: "Buy Now",
            getStarted: "Get Started", 
            subtitle:"Discover the best local produce",
            footerText: "© 2023 AgriLink Rwanda. All rights reserved."
          }
        }
      },
	    });

export default i18n;
