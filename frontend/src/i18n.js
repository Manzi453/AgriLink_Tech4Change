import i18n from 'i18next';
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
      fr: {
        translation: {
          welcome: "Bienvenue à AgriLink Rwanda",
          login: "Connexion",
          signupLabel: "S'inscrire",
          auth: {
            title: "Connexion / Inscription",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Mot de passe",
            loginButton: "Connexion",
            createAccount: "Créer un compte",
            farmerQuestion: "Êtes-vous agriculteur?",
            requestMembership: "Demander une adhésion",
            noAccount: "Vous n'avez pas de compte?"
          },
          signup: {
            title: "Créer un compte",
            namePlaceholder: "Nom complet",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Mot de passe",
            confirmPasswordPlaceholder: "Confirmer le mot de passe",
            submitButton: "S'inscrire",
            haveAccount: "Vous avez déjà un compte?",
            login: "Connexion"
          },
          membership: {
            title: "Adhésion Agriculteur",
            subtitle: "Rejoignez notre communauté agricole",
            farmNamePlaceholder: "Nom de la ferme",
            locationPlaceholder: "Localisation",
            sizePlaceholder: "Taille de la ferme (hectares)",
            cropsPlaceholder: "Cultures principales",
            emailPlaceholder: "Email",
            phonePlaceholder: "Numéro de téléphone",
            submitButton: "Soumettre la demande",
            alreadyMember: "Déjà membre?",
            loginInstead: "Connectez-vous ici"
          },
          dashboard: {
            greeting: "Bonjour, Agriculteur!",
            dashboard: "Tableau de bord",
            settings: "Paramètres",
            myCrops: "Mes cultures",
            messages: "Messages",
            reports: "Rapports",
            logout: "Déconnexion",
            addCrop: "Ajouter une culture",
            edit: "Modifier",
            delete: "Supprimer",
            editCrop: "Modifier la culture",
            cropName: "Nom de la culture",
            quantity: "Quantité",
            price: "Prix",
            description: "Description",
            image: "Image",
            save: "Enregistrer",
            update: "Mettre à jour",
            cancel: "Annuler",
            available: "Disponible"
          },
          settings: {
            profile: "Profil",
            manageProfile: "Gérer vos informations de profil",
            notifications: "Notifications",
            manageNotifications: "Configurer les préférences de notification",
            security: "Sécurité",
            changePassword: "Changer votre mot de passe",
            configure: "Configurer",
            update: "Mettre à jour"
          },
          appName: "AGRLINK",
          units: {
            kg: "Kg",
            rwfPerKg: "FRW/kg"
          },
          home: {
            navHome: "Accueil",
            getStarted: "Commencer",
            subtitle: "Découvrez les meilleurs produits locaux",
            featuredProducts: "Produits en vedette",
            buyNow: "Acheter maintenant",
            footerText: "© 2023 AgriConnect Rwanda. Tous droits réservés."
          }
        }
      },
      rw: {
        translation: {
          welcome: "Murakaza neza kuri AgriLink Rwanda",
          login: "Injira",
          signupLabel: "Iyandikishe",
          auth: {
            title: "Injira / Iyandikishe",
            emailPlaceholder: "Imeri",
            passwordPlaceholder: "Ijambobanga",
            loginButton: "Injira",
            createAccount: "Kora konti",
            farmerQuestion: "Uri umuhinzi?",
            requestMembership: "Saba ubumemberi",
            noAccount: "Nta konti ufite?"
          },
          signup: {
            title: "Kora Konti",
            namePlaceholder: "Amazina yose",
            emailPlaceholder: "Imeri",
            passwordPlaceholder: "Ijambobanga",
            confirmPasswordPlaceholder: "Emeza ijambobanga",
            submitButton: "Iyandikishe",
            haveAccount: "Urafite konti?",
            login: "Injira"
          },
          membership: {
            title: "Ubumemberi bw'Umuhinzi",
            subtitle: "Dora umuryango w'abahinzi",
            farmNamePlaceholder: "Izina ry'ubuhinzi",
            locationPlaceholder: "Aho ubuhinzi buri",
            sizePlaceholder: "Ingano y'ubuhinzi (Hektari)",
            cropsPlaceholder: "Ibiribwa by'ibanze",
            emailPlaceholder: "Imeri",
            phonePlaceholder: "Numero ya telefoni",
            submitButton: "Ohereza gahunda",
            alreadyMember: "Urimuri memberi?",
            loginInstead: "Injira hano"
          },
          dashboard: {
            greeting: "Mwaramutse, Muhinzi!",
            dashboard: "Ikibaho",
            settings: "Igenamiterere",
            myCrops: "Ibiribwa byanjye",
            messages: "Ubutumwa",
            reports: "Raporo",
            logout: "Sohoka",
            addCrop: "Ongeraho ibiribwa",
            edit: "Hindura",
            delete: "Siba",
            editCrop: "Hindura ibiribwa",
            cropName: "Izina ry'ikiribwa",
            quantity: "Umubare",
            price: "Igiciro",
            description: "Ibisobanuro",
            image: "Ishusho",
            save: "Bika",
            update: "Kuvugurura",
            cancel: "Kureka",
            available: "Bihari"
          },
          settings: {
            profile: "Profayili",
            manageProfile: "Gucunga amakuru yawe",
            notifications: "Amatangazo",
            manageNotifications: "Guhindura amatangazo",
            security: "Umutekano",
            changePassword: "Hindura ijambobanga",
            configure: "Gushiraho",
            update: "Kuvugurura",
            
          },
          appName: "AGRILINK",
          units: {
            kg: "Kg",
            rwfPerKg: "FRW/kg"
          },
          home: {
            navHome: "Ahabanza",
            getStarted: "Tangirira hano",
            subtitle: "Sanga ibicuruzwa byiza by'imboga n'ibinyomoro",
            featuredProducts: "Ibicuruzwa byagaragajwe",
            buyNow: "Gura nonaha",
            footerText: "© 2023 AgriConnect Rwanda. Amategeko y'umutungo kamere."
          }
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    // In your translation files (en.json, fr.json, etc.)

});

export default i18n;