


import { DietProtocol, ActivityLevel, Gender, Goal, RecipeCategory, RecipeTag, SportActivity, PregnancyStatus, MedicalCondition } from './types';

export const APP_TITLE = "FITNESS RASHIK"; // Updated title
// SVG logo as a data URI for reliability.
export const LOGO_URL = "data:image/svg+xml,%3csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' style='stop-color:rgb(79,70,229);stop-opacity:1' /%3e%3cstop offset='100%25' style='stop-color:rgb(165,55,253);stop-opacity:1' /%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='50' cy='50' r='45' fill='url(%23grad1)'/%3e%3ctext x='50' y='60' font-family='Arial, sans-serif' font-size='30' fill='white' text-anchor='middle' font-weight='bold'%3eFR%3c/text%3e%3c/svg%3e";

// --- Tier Limits ---
export const FREE_TIER_CUSTOM_FOOD_LIMIT = 20;
export const FREE_TIER_RECIPE_LIMIT = 10;
export const FREE_TIER_PLAN_GENERATION_LIMIT = 3;
export const FREE_TIER_PDF_DOWNLOAD_LIMIT = 2;

// --- Meal Plan Defaults ---
export const DEFAULT_NUMBER_OF_MEALS = 3;
export const MIN_DAYS = 1;
export const MAX_DAYS = 7;
export const MIN_MEALS = 2;
export const MAX_MEALS = 6;


// --- MACROS AND CALORIES ---
export const GRAMS_PER_CALORIE = {
  protein: 4,
  carbs: 4,
  fat: 9
};

export const MACRO_DISTRIBUTIONS = {
  BALANCED: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  KETO: { protein: 0.25, carbs: 0.05, fat: 0.70 },
};

export const KETO_CARB_LIMIT_GRAMS = 50;

// --- UI OPTIONS ---
export const GENDER_OPTIONS = [
  { value: Gender.MALE, label: 'ذكر' },
  { value: Gender.FEMALE, label: 'أنثى' },
];

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: ActivityLevel.SEDENTARY, label: 'خامل (عمل مكتبي، قليل الحركة)' },
  { value: ActivityLevel.LIGHT, label: 'نشاط خفيف (تمرين 1-3 أيام/أسبوع)' },
  { value: ActivityLevel.MODERATE, label: 'نشاط متوسط (تمرين 3-5 أيام/أسبوع)' },
  { value: ActivityLevel.ACTIVE, label: 'نشيط (تمرين 6-7 أيام/أسبوع)' },
  { value: ActivityLevel.VERY_ACTIVE, label: 'نشيط جداً (تمرين شاق، وظيفة تتطلب مجهودًا)' },
];

export const GOAL_OPTIONS = [
  { value: Goal.LOSE_WEIGHT, label: 'خسارة الوزن والدهون' },
  { value: Goal.MAINTAIN_WEIGHT, label: 'الحفاظ على الوزن الحالي' },
  { value: Goal.GAIN_WEIGHT, label: 'زيادة الوزن وبناء العضلات' },
  { value: Goal.MINI_CUT, label: 'تنشيف سريع (Mini-Cut)'}
];

export const DEFICIT_SURPLUS_OPTIONS = [
    { value: 0.10, label: 'لطيف (10%)' },
    { value: 0.15, label: 'متوسط (15%)' },
    { value: 0.20, label: 'قوي (20%)' },
];

export const DIET_PROTOCOL_OPTIONS = [
  { value: DietProtocol.NONE, label: 'النظام المتوازن (افتراضي)' },
  { value: DietProtocol.KETO, label: 'نظام الكيتو' },
  { value: DietProtocol.CARB_CYCLING, label: 'تدوير الكربوهيدرات (Carb Cycling)' },
  { value: DietProtocol.INTERMITTENT_FASTING, label: 'الصيام المتقطع' },
];

export const PREGNANCY_STATUS_OPTIONS = [
    { value: PregnancyStatus.NONE, label: 'لا شيء مما سبق' },
    { value: PregnancyStatus.PREGNANT, label: 'حامل' },
    { value: PregnancyStatus.BREASTFEEDING, label: 'مرضع' },
    { value: PregnancyStatus.MENOPAUSE, label: 'في سن اليأس' },
];

export const MEDICAL_CONDITION_OPTIONS = [
    { value: MedicalCondition.NONE, label: 'لا يوجد' },
    { value: MedicalCondition.HYPOTHYROIDISM, label: 'قصور الغدة الدرقية' },
    { value: MedicalCondition.HYPERTHYROIDISM, label: 'فرط نشاط الغدة الدرقية' },
    { value: MedicalCondition.PCOS, label: 'متلازمة تكيس المبايض (PCOS)' },
    { value: MedicalCondition.DIABETES_TYPE_1, label: 'سكري النوع الأول' },
    { value: MedicalCondition.DIABETES_TYPE_2, label: 'سكري النوع الثاني' },
    { value: MedicalCondition.GESTATIONAL_DIABETES, label: 'سكري الحمل' },
    { value: MedicalCondition.HYPERTENSION, label: 'ارتفاع ضغط الدم' },
];

export const SPORT_ACTIVITY_OPTIONS = [
  { value: SportActivity.GENERAL_FITNESS, label: 'لياقة عامة (General Fitness)' },
  { value: SportActivity.STRENGTH_BODYBUILDING, label: 'رياضات القوة وكمال الأجسام' },
  { value: SportActivity.ENDURANCE, label: 'رياضات التحمل (الجري، الدراجات)' },
  { value: SportActivity.CROSSFIT, label: 'كروس فيت (CrossFit)' },
  { value: SportActivity.TEAM_SPORTS, label: 'رياضات جماعية (كرة قدم، سلة)' },
  { value: SportActivity.GYMNASTICS_MARTIAL_ARTS, label: 'جمباز وفنون قتالية خفيفة' },
  { value: SportActivity.HEAVY_MARTIAL_ARTS, label: 'فنون قتالية ثقيلة (جودو، مصارعة)' },
  { value: SportActivity.WEIGHT_CLASS, label: 'رياضات أوزان (رفع أثقال)' },
  { value: SportActivity.YOGA_PILATES, label: 'يوغا وبيلاتس' },
  { value: SportActivity.HOME_WORKOUTS, label: 'تمارين منزلية' },
];

export const RECIPE_CATEGORY_OPTIONS = [
  { value: RecipeCategory.NONE, label: 'بدون تصنيف' },
  { value: RecipeCategory.BREAKFAST, label: 'فطور' },
  { value: RecipeCategory.LUNCH, label: 'غداء' },
  { value: RecipeCategory.DINNER, label: 'عشاء' },
  { value: RecipeCategory.SNACK, label: 'وجبة خفيفة' },
];

export const RECIPE_TAG_OPTIONS = [
    { value: RecipeTag.HIGH_PROTEIN, label: 'عالي البروتين' },
    { value: RecipeTag.LOW_CARB, label: 'قليل الكربوهيدرات' },
    { value: RecipeTag.KETO, label: 'كيتو' },
    { value: RecipeTag.VEGETARIAN, label: 'نباتي' },
];

export const getRecipeCategoryLabel = (category: RecipeCategory): string => {
    return RECIPE_CATEGORY_OPTIONS.find(opt => opt.value === category)?.label || 'غير مصنف';
};


// --- UI LABELS & TEXTS ---
// Generic
export const LOADING_MESSAGE = 'جاري التحميل...';
export const CANCEL_BUTTON = 'إلغاء';
export const CONFIRM_BUTTON = 'تأكيد';
export const REQUIRED_FIELD_ERROR = 'هذا الحقل مطلوب.';
export const POSITIVE_NUMBER_ERROR = 'الرجاء إدخال رقم موجب.';
export const CALORIES_LABEL = 'السعرات';
export const PROTEIN_LABEL = 'البروتين';
export const CARBS_LABEL = 'الكارب';
export const FAT_LABEL = 'الدهون';
export const CALORIES_UNIT = 'سعرة';
export const PROTEIN_UNIT = 'جرام بروتين';
export const CARBS_UNIT = 'جرام كارب';
export const FAT_UNIT = 'جرام دهون';
export const WEIGHT_KG_LABEL = 'الوزن (كجم)';
export const LOGOUT_BUTTON = 'تسجيل الخروج';


// Navigation Links
export const USER_DASHBOARD_NAV_LINK = "لوحة التحكم";
export const FOOD_DATABASE_NAVIGATION_LINK = "قاعدة البيانات الغذائية";
export const RECIPES_NAVIGATION_LINK = "وصفاتي";
export const RECIPE_DRIVEN_MEAL_PLAN_NAVIGATION_LINK = "الخطة الذكية";
export const BURNED_CALORIES_CALCULATOR_NAV_LINK = "حاسبة حرق السعرات";
export const PROGRESS_TRACKING_NAV_LINK = "متابعة التقدم";
export const SETTINGS_NAV_LINK = "الإعدادات";
export const ANALYZE_MEAL_FROM_PHOTO_NAV_LINK = "تحليل وجبة بالصورة";
export const DAILY_DIARY_NAV_LINK = "يومياتي";
export const REPORTS_NAV_LINK = "التقارير";
export const SUPPLEMENTS_GUIDE_NAV_LINK = "دليل المكملات";
export const MICRONUTRIENT_ANALYSIS_NAV_LINK = "تحليل الفيتامينات والمعادن";
export const AI_RECIPE_GENERATOR_NAV_LINK = "مولد الوصفات الذكي";
export const IDEAL_BODY_FAT_NAV_LINK = "نسبة الدهون المثالية";
export const BODY_COMPOSITION_NAV_LINK = "تحليل تكوين الجسم";
export const MAIN_CALCULATOR_NAV_LINK = "العودة إلى الحاسبة الرئيسية";


// Auth
export const LOGIN_TITLE = 'تسجيل الدخول';
export const EMAIL_LABEL = 'البريد الإلكتروني';
export const PASSWORD_LABEL = 'كلمة المرور';
export const LOGIN_BUTTON = 'دخول';
export const NO_ACCOUNT_PROMPT = 'ليس لديك حساب؟';
export const SIGN_UP_LINK = 'أنشئ حسابًا جديدًا';
export const AUTH_ERROR_HEADER = 'خطأ في المصادقة';
export const FORGOT_PASSWORD_LINK = 'نسيت كلمة المرور؟';

export const REGISTER_TITLE = 'إنشاء حساب جديد';
export const CONFIRM_PASSWORD_LABEL = 'تأكيد كلمة المرور';
export const REGISTER_BUTTON = 'إنشاء حساب';
export const ALREADY_HAVE_ACCOUNT_PROMPT = 'لديك حساب بالفعل؟';
export const LOGIN_LINK = 'سجل الدخول';

export const FORGOT_PASSWORD_TITLE = 'استعادة كلمة المرور';
export const FORGOT_PASSWORD_INSTRUCTIONS = 'أدخل بريدك الإلكتروني المسجل وسنساعدك في استعادة حسابك.';
export const RECOVER_ACCOUNT_BUTTON = 'استعادة الحساب';
export const BACK_TO_LOGIN_BUTTON = 'العودة إلى تسجيل الدخول';
export const PASSWORD_RECOVERY_SUCCESS_TITLE = 'تم استرداد كلمة المرور';
export const PASSWORD_RECOVERY_SUCCESS_MESSAGE = 'كلمة المرور الحالية لحسابك هي:';
export const PASSWORD_RECOVERY_SECURITY_WARNING = 'لأسباب أمنية، نوصي بتسجيل الدخول وتغيير كلمة المرور هذه فورًا من صفحة الإعدادات.';

// User Input Form
export const SPECIAL_CONSIDERATIONS_TITLE = "اعتبارات خاصة";
export const SPECIAL_CONSIDERATIONS_NOTE = "هذه المعلومات تساعدنا في تخصيص الخطة بشكل أفضل. اتركها فارغة إذا لم تنطبق عليك.";
export const TARGET_SUGGESTION_TITLE = "اقتراح ذكي للهدف";
export const IDEAL_BODY_FAT_RANGE_TEXT = (sport: string) => `النطاق المثالي لنسبة الدهون لنشاط (${sport}) هو`;
export const SUGGESTED_TARGET_WEIGHT_TEXT = "للوصول لهذا النطاق، نقترح أن يكون وزنك المستهدف حوالي";
export const USE_THIS_TARGET_BUTTON = "استخدم هذا الهدف";

// Results Display
export const ADVANCED_RESULTS_TITLE = 'خطتك الاستراتيجية المفصلة';
export const DAILY_TARGETS_LABEL = 'سعراتك اليومية';
export const PLAN_PHASES_LABEL = 'مراحل الخطة المقترحة';
export const IMPORTANT_WARNINGS_LABEL = '⚠️ تحذيرات هامة';
export const IMPORTANT_GUIDELINES_LABEL = '💡 إرشادات هامة';
export const BMR_LABEL = 'الأيض الأساسي (BMR)';
export const TDEE_LABEL = 'سعرات الصيانة (TDEE)';
export const SUGGESTED_PROTOCOLS_LABEL = 'بروتوكولات مقترحة';
export const NEXT_STEP_TITLE = 'ما هي خطوتك التالية؟';
export const DOWNLOAD_PLAN_GUIDE_BUTTON = 'تحميل دليل الخطة (PDF)';
export const GOTO_SMART_PLAN_BUTTON = 'الانتقال إلى مخطط الوجبات الذكي';
export const RECALCULATE_NEEDS_BUTTON = 'إعادة حساب الاحتياجات';
export const ESTIMATED_DURATION_LABEL = "المدة المقدرة";
export const IDEAL_BODY_FAT_TARGET_TITLE = "هدفك المثالي لنسبة الدهون";
export const TIMELINE_PLANNER_TITLE = "مخطط المدة الزمنية";
export const TIMELINE_LABEL = "أريد الوصول لهدفي خلال:";
export const APPLY_TIMELINE_BUTTON = "تطبيق هذه المدة وتحديث السعرات";


// Food Database
export const FOOD_DATABASE_TITLE = 'قاعدة البيانات الغذائية';
export const ADD_NEW_FOOD_BUTTON = 'إضافة طعام جديد';
export const SEARCH_FOOD_PLACEHOLDER = 'ابحث عن طعام...';
export const NO_FOOD_ITEMS_FOUND = 'لم يتم العثور على أطعمة تطابق بحثك.';
export const NO_FOOD_ITEMS_YET = 'قاعدة البيانات العامة فارغة حاليًا.';
export const NO_CUSTOM_FOOD_ITEMS_YET = 'لم تقم بإضافة أي أطعمة مخصصة بعد.';
export const PUBLIC_DATABASE_TAB = 'القاعدة العامة';
export const MY_FOODS_TAB = 'أطعمتي';
export const CONFIRM_DELETE_FOOD_MESSAGE = 'هل أنت متأكد أنك تريد حذف هذا الطعام؟ لا يمكن التراجع عن هذا الإجراء.';
export const CUSTOM_FOOD_BADGE = 'مخصص';
export const EDIT_FOOD_BUTTON = 'تعديل الطعام';
export const DELETE_FOOD_BUTTON = 'حذف الطعام';
export const COPY_TO_MY_FOODS_BUTTON = 'نسخ إلى أطعمتي';
export const SERVING_SIZE_LABEL = 'حجم الحصة';

// Add Food Form
export const FOOD_NAME_LABEL = 'اسم الطعام';
export const SERVING_SIZE_PLACEHOLDER = 'مثال: 100 جرام، 1 كوب (240مل)، 1 بيضة (50g)';
export const SERVING_SIZE_GRAMS_ERROR = "يجب أن يحتوي حجم الحصة على قيمة بالجرامات (g أو جرام) أو بالمليلتر (ml أو مل).";
export const SUBMIT_NEW_FOOD_BUTTON = 'إضافة الطعام';
export const LABEL_PER_SERVING = 'القيم الغذائية لكل حصة مذكورة أعلاه.';
export const EDIT_FOOD_TITLE = 'تعديل بيانات الطعام';

// Recipe List View
export const RECIPE_LIST_TITLE = 'مكتبة وصفاتي';
export const CREATE_NEW_RECIPE_BUTTON = 'إنشاء وصفة جديدة';
export const NO_RECIPES_YET = 'لم تقم بإنشاء أي وصفات بعد.';
export const NO_RECIPES_FOUND = 'لم يتم العثور على وصفات تطابق بحثك.';
export const SEARCH_RECIPES_PLACEHOLDER = 'ابحث عن وصفة...';
export const PUBLIC_RECIPES_TAB = 'وصفات عامة';
export const MY_RECIPES_TAB = 'وصفاتي';
export const IMAGE_PREVIEW_ALT = 'معاينة الصورة';

// Recipe Creation
export const ADD_RECIPE_TITLE = 'إنشاء وصفة جديدة';
export const EDIT_RECIPE_TITLE = 'تعديل الوصفة';
export const RECIPE_NAME_LABEL = 'اسم الوصفة';
export const RECIPE_DESCRIPTION_LABEL = 'الوصف (اختياري)';
export const RECIPE_IMAGE_LABEL = 'صورة الوصفة (اختياري)';
export const UPLOAD_IMAGE_BUTTON = 'رفع صورة';
export const CHANGE_IMAGE_BUTTON = 'تغيير الصورة';
export const REMOVE_IMAGE_BUTTON = 'إزالة الصورة';
export const IMAGE_UPLOAD_NOTE = 'JPG, PNG, WEBP (حد أقصى 2MB)';
export const IMAGE_URL_INPUT_PLACEHOLDER = 'أو الصق رابط صورة هنا';
export const RECIPE_SERVINGS_LABEL = 'عدد الحصص';
export const ADD_INGREDIENT_BUTTON = 'إضافة مكون جديد';
export const INGREDIENTS_LABEL = 'المكونات';
export const INGREDIENT_FOOD_ITEM_LABEL = 'المكون الغذائي';
export const INGREDIENT_QUANTITY_GRAM_LABEL = 'الكمية (جرام)';
export const TOTAL_RECIPE_MACROS_LABEL = 'إجمالي ماكروز الوصفة';
export const PER_SERVING_MACROS_LABEL = 'ماكروز الحصة الواحدة';
export const SAVE_RECIPE_BUTTON = 'حفظ الوصفة';
export const REMOVE_INGREDIENT_LABEL = 'إزالة المكون';
export const SELECT_INGREDIENT_PLACEHOLDER = 'ابحث واختر من قاعدة البيانات...';
export const RECIPE_CATEGORY_LABEL = 'تصنيف الوصفة';
export const RECIPE_TAGS_LABEL = 'وسوم الوصفة';
export const RECIPE_CATEGORY_IMPORTANCE_HINT = 'تصنيف الوصفات كـ "فطور"، "غداء"، و "عشاء" ضروري لإنشاء خطط ذكية تلقائية.';
export const EDIT_THIS_RECIPE_BUTTON = 'تعديل هذه الوصفة';
export const DELETE_THIS_RECIPE_BUTTON = 'حذف هذه الوصفة';

// Recipe Validation
export const RECIPE_SERVINGS_POSITIVE = 'عدد الحصص يجب أن يكون رقمًا موجبًا.';
export const RECIPE_INGREDIENTS_REQUIRED = 'يجب إضافة مكون واحد على الأقل.';
export const INGREDIENT_QUANTITY_POSITIVE = 'يجب أن تكون كمية المكون أكبر من صفر.';
export const NO_VALID_FOOD_ITEMS_FOR_RECIPE = 'لا توجد أطعمة صالحة في قاعدة البيانات (يجب أن تحتوي على وزن بالجرامات). الرجاء إضافة بعض الأطعمة أولاً.';
export const ERROR_INGREDIENT_NO_GRAMS = 'لا يمكن حساب الماكروز لهذا المكون لأنه لا يحتوي على وزن بالجرامات في حجم الحصة.';

// Image Upload Errors
export const ERROR_IMAGE_UPLOAD_SIZE = (size: number) => `حجم الصورة يتجاوز الحد المسموح به (${size}MB).`;
export const ERROR_IMAGE_UPLOAD_TYPE = 'نوع الملف غير مدعوم. الرجاء اختيار صورة من نوع JPG, PNG, WEBP, أو GIF.';
export const ERROR_IMAGE_LOAD_PREVIEW = 'فشل تحميل معاينة الصورة. قد يكون الرابط غير صالح.';

// Recipe Detail
export const RECIPE_DETAIL_TITLE = 'تفاصيل الوصفة';
export const BACK_TO_RECIPES_BUTTON = 'العودة إلى قائمة الوصفات';
export const CONFIRM_DELETE_RECIPE_MESSAGE = 'هل أنت متأكد أنك تريد حذف هذه الوصفة؟ سيتم إزالتها نهائيًا.';
export const NO_DESCRIPTION_AVAILABLE = 'لا يوجد وصف متاح لهذه الوصفة.';

// Select Recipe Modal
export const SELECT_RECIPE_MODAL_TITLE = 'اختر وصفة';
export const NO_RECIPES_AVAILABLE_TO_ASSIGN = 'لا توجد وصفات في مكتبتك لتعيينها. أنشئ وصفتك الأولى!';

// Meal Plan
export const RECIPE_DRIVEN_MEAL_PLAN_TITLE = 'مخطط الوجبات الذكي';
export const CALCULATE_NEEDS_FIRST_PROMPT = 'الرجاء حساب احتياجاتك اليومية أولاً لتتمكن من استخدام مخطط الوجبات.';
export const MEAL_SLOT_SETUP_TITLE = 'إعداد الوجبات';
export const ASSIGN_RECIPE_BUTTON = 'تعيين وصفة';
export const CHANGE_RECIPE_BUTTON = 'تغيير';
export const ADJUST_THIS_DAY_BUTTON = 'عدّل هذا اليوم تلقائياً';
export const VIEW_ADJUSTED_PLAN_DETAILS_BUTTON = 'عرض تفاصيل الخطة والحفظ';
export const RECIPE_NOT_ASSIGNED = 'لم يتم تعيين وصفة';
export const MEAL_PLAN_DAYS_LABEL = 'عدد الأيام';
export const DAY_LABEL_PREFIX = 'اليوم';
export const NUMBER_OF_MEALS_LABEL = 'عدد الوجبات';
export const SET_DAY_TYPE_LABEL = 'نوع اليوم';
export const HIGH_CARB_DAY_LABEL = 'كارب مرتفع';
export const MEDIUM_CARB_DAY_LABEL = 'كارب متوسط';
export const LOW_CARB_DAY_LABEL = 'كارب منخفض';
export const KETO_DAY_LABEL = 'كيتو';
export const TARGET_DAILY_NEEDS_LABEL = 'احتياجاتك المستهدفة لهذا اليوم';
export const PLAN_TOTALS_TITLE = 'مجموع اليوم الحالي';
export const PLAN_DIFFERENCE_TITLE = 'الفرق عن الهدف';
export const SAVED_PLANS_TITLE = 'الخطط المحفوظة';
export const LOAD_PLAN_BUTTON = 'تحميل';
export const DELETE_PLAN_BUTTON = 'حذف';
export const NO_SAVED_PLANS = 'لا توجد خطط محفوظة بعد.';
export const CONFIRM_DELETE_PLAN_MESSAGE = 'هل أنت متأكد أنك تريد حذف هذه الخطة؟';
export const CHANGE_DIET_PROTOCOL_LABEL = 'تغيير البروتوكول الغذائي (للمشتركين)';
export const EATING_WINDOW_LABEL = 'نافذة الأكل';
export const KETO_CARB_WARNING_MESSAGE = (limit: number) => `تجاوزت حد الكربوهيدرات المسموح به في نظام الكيتو (${limit} جرام).`;
export const IF_INSTRUCTIONAL_TEXT = "مخطط الوجبات الذكي لا يوزع الوجبات ضمن نافذة الأكل تلقائيًا. يرجى التأكد من تناول الوجبات المخطط لها خلال نافذة الصيام التي حددتها بنفسك.";
export const VIEW_SAVED_PLAN_DETAILS_BUTTON = 'عرض التفاصيل';
export const GENERATE_AI_PLAN_BUTTON = 'توليد خطة بالذكاء الاصطناعي';
export const SMART_PLAN_GUIDANCE_TITLE = 'جاهز لإنشاء خطة ذكية؟';
export const SMART_PLAN_GUIDANCE_SUBTITLE = 'للحصول على أفضل النتائج من المولد التلقائي، تأكد من استيفاء المتطلبات التالية:';
export const SMART_PLAN_REQ_TOTAL_RECIPES = (count: number) => `لديك <strong>${count}/3 وصفات</strong> على الأقل في مكتبتك.`;
export const SMART_PLAN_REQ_BREAKFAST = `وصفة واحدة على الأقل مصنفة كـ <strong>"فطور"</strong>.`;
export const SMART_PLAN_REQ_LUNCH = `وصفة واحدة على الأقل مصنفة كـ <strong>"غداء"</strong>.`;
export const SMART_PLAN_REQ_DINNER = `وصفة واحدة على الأقل مصنفة كـ <strong>"عشاء"</strong>.`;
export const ADD_FIRST_RECIPE_BUTTON = "أضف وصفتك الأولى";
export const ADJUST_THIS_DAY_BUTTON_DESC = "يضبط كميات الوصفات المحددة لتناسب هدفك اليومي.";
export const GENERATE_PLAN_BASIC_TEXT = "تعبئة وتعديل الخطة";
export const GENERATE_PLAN_BASIC_DESC = "يستخدم وصفاتك الثلاث (فطور، غداء، عشاء) لملء وتعديل الخطة.";
export const GENERATE_PLAN_VARIED_TEXT = "توليد خطة متنوعة";
export const GENERATE_PLAN_VARIED_DESC = "يستخدم وصفاتك المتعددة لإنشاء خطة متنوعة وتعديلها.";
export const GENERATE_PLAN_AI_TEXT = (btn_text: string) => btn_text;
export const GENERATE_PLAN_AI_DESC = "يستخدم الذكاء الاصطناعي لاختيار أفضل الوصفات وتوزيعها بذكاء على مدار الأسبوع.";


// Adjusted Meal Plan Detail
export const ADJUSTED_MEAL_PLAN_DETAIL_TITLE = 'تفاصيل خطة الوجبات';
export const BACK_TO_PLAN_EDITOR_BUTTON = 'العودة إلى التعديل';
export const MEAL_INGREDIENTS_FOR_ADJUSTED_SERVINGS = 'مكونات الوجبة بالكمية المعدلة:';
export const ADJUSTED_SERVINGS_DISPLAY_LABEL = 'الكمية المعدلة';
export const DOWNLOAD_PLAN_PDF_BUTTON = 'تحميل الخطة (PDF)';
export const PDF_PLAN_TITLE = 'خطتك الغذائية المخصصة';
export const GENERATE_SHOPPING_LIST_BUTTON = 'إنشاء قائمة التسوق';
export const DAY_TOTALS_LABEL = 'إجمالي اليوم';
export const VIEW_ONLY_MODE_NOTICE = "أنت في وضع العرض فقط. لتحميل هذه الخطة وتعديلها، انقر على زر التحميل.";
export const LOAD_THIS_PLAN_BUTTON = "تحميل هذه الخطة";
export const SAVE_PLAN_BUTTON = "حفظ الخطة";
export const ENTER_PLAN_NAME_PROMPT = 'أدخل اسمًا لخطتك';
export const PLAN_NAME_LABEL = 'اسم الخطة';

// Shopping List
export const SHOPPING_LIST_TITLE = 'قائمة التسوق';
export const SHOPPING_LIST_DESCRIPTION = 'قائمة مجمعة بجميع المكونات التي تحتاجها لخطتك الغذائية.';
export const DOWNLOAD_SHOPPING_LIST_BUTTON = 'تحميل القائمة (PDF)';
export const NO_ITEMS_IN_SHOPPING_LIST = 'لا توجد عناصر في قائمة التسوق. قم بإنشاء خطة أولاً.';
export const SHOPPING_LIST_ITEM_HEADER = 'العنصر';
export const SHOPPING_LIST_QUANTITY_HEADER = 'الكمية الإجمالية';

// Dashboard
export const USER_DASHBOARD_TITLE = 'لوحة التحكم الرئيسية';
export const WELCOME_MESSAGE_PREFIX = 'أهلاً بك، ';
export const DAILY_NEEDS_TITLE_DASHBOARD = 'احتياجاتك اليومية';
export const CALCULATE_NEEDS_PROMPT_DASHBOARD = 'لم تقم بحساب احتياجاتك اليومية بعد. ابدأ الآن لوضع أساس لرحلتك الصحية.';
export const START_CALCULATION_BUTTON = 'ابدأ الحساب الآن';
export const PROGRESS_SUMMARY_TITLE = 'ملخص التقدم';
export const LATEST_ENTRY_LABEL = 'آخر قراءة:';
export const VIEW_ALL_PROGRESS_BUTTON = 'عرض كل السجلات';
export const NO_PROGRESS_LOGGED_DASHBOARD = 'لم تسجل أي تقدم بعد. سجل قراءتك الأولى لتبدأ.';
export const LOG_FIRST_PROGRESS_BUTTON = 'سجل قراءتك الأولى';
export const MY_DATA_TITLE = 'بياناتي وأدواتي';
export const MY_FOODS_LINK_PREFIX = 'لديك';
export const MY_RECIPES_LINK_PREFIX = 'لديك';
export const ITEM_UNIT_PLURAL = 'عنصرًا';
export const RECIPE_UNIT_PLURAL = 'وصفة';
export const UPGRADE_TO_PREMIUM_TITLE = "الترقية إلى بريميوم";
export const UPGRADE_NOW_BUTTON = "الترقية الآن";
export const UNLOCK_ALL_FEATURES_TITLE = "افتح جميع الميزات الحصرية:";
export const UNLOCK_ALL_FEATURES_LIST = [
    "عدد لا محدود من الأطعمة والوصفات المخصصة.",
    "خطط غذائية متعددة الأيام.",
    "تحليل الوجبات من الصور.",
    "نصائح ذكية لكسر ثبات الوزن.",
    "تحميل غير محدود لملفات PDF."
];
export const GET_PLATEAU_ADVICE_BUTTON = "تحليل ثبات الوزن وطلب نصيحة";
export const NOT_ENOUGH_DATA_FOR_ADVICE = "لا توجد بيانات كافية لتقديم نصيحة. يرجى تسجيل المزيد من التقدم أولاً.";


// Burned Calories Calculator
export const BURNED_CALORIES_CALCULATOR_TITLE = 'حاسبة حرق السعرات';
export const BURNED_CALORIES_CALCULATOR_DESCRIPTION = 'احسب السعرات الحرارية التي حرقتها أثناء نشاطك البدني باستخدام قيمة MET أو معدل ضربات القلب لمزيد من الدقة.';
export const AGE_LABEL = 'العمر';
export const GENDER_LABEL = 'الجنس';
export const DURATION_MIN_LABEL = 'المدة (دقائق)';
export const HEART_RATE_BPM_LABEL = 'متوسط ضربات القلب (اختياري)';
export const HEART_RATE_BPM_PLACEHOLDER = 'لنتيجة أدق، مثال: 135';
export const ACTIVITY_LABEL = 'النشاط البدني';
export const SEARCH_ACTIVITY_PLACEHOLDER = 'ابحث عن نشاط... (مثال: جري، سباحة)';
export const CALCULATE_BURNED_CALORIES_BUTTON = 'احسب السعرات المحروقة';
export const BURNED_CALORIES_RESULT_TITLE = 'النتيجة التقديرية';
export const BURNED_CALORIES_RESULT_VALUE = 'سعرة حرارية';
export const CALCULATION_METHOD_USED_LABEL = 'الطريقة المستخدمة:';
export const MET_METHOD_NAME = 'معادلة MET القياسية';
export const HR_METHOD_NAME = 'معادلة معدل ضربات القلب (أكثر دقة)';
export const NO_ACTIVITY_SELECTED_ERROR = 'الرجاء اختيار نشاط بدني من القائمة.';
export const FILL_REQUIRED_FIELDS_ERROR = 'الرجاء ملء حقول الوزن، العمر، والمدة بشكل صحيح.';

// Progress Tracking
export const PROGRESS_TRACKING_TITLE = 'متابعة التقدم';
export const ADD_NEW_ENTRY_BUTTON = 'إضافة قراءة جديدة';
export const LOG_MEASUREMENTS_BUTTON = 'حفظ القراءة';
export const DATE_LABEL = 'التاريخ';
export const NECK_CM_LABEL = 'الرقبة (سم)';
export const WAIST_CM_LABEL = 'الخصر (سم)';
export const HIPS_CM_LABEL = 'الأرداف (سم)';
export const THIGH_CM_LABEL = 'الفخذ (سم)';
export const BODY_FAT_PERCENTAGE_LABEL = 'نسبة الدهون (%)';
export const BODY_FAT_MASS_LABEL = 'كتلة الدهون';
export const LEAN_BODY_MASS_LABEL = 'الكتلة الصافية';
export const BODY_FAT_CATEGORY_LABEL = 'الفئة';
export const CALCULATE_BODY_FAT_BUTTON = 'حساب نسبة الدهون';
export const HISTORICAL_ENTRIES_TITLE = 'السجل التاريخي للقراءات';
export const NO_PROGRESS_ENTRIES_YET = 'لا توجد قراءات مسجلة بعد. ابدأ بتسجيل أول قراءة لك!';
export const NAVY_BF_INSTRUCTIONS = 'لحساب نسبة الدهون، سيتم استخدام طريقة البحرية الأمريكية بناءً على قياسات الجسم والطول والجنس المسجلين في الحاسبة الرئيسية.';
export const BODY_FAT_INPUTS_REQUIRED = 'يرجى إدخال قياسات الرقبة والخصر (والأرداف للنساء).';
export const USED_HEIGHT_LABEL = 'الطول المستخدم';
export const USED_GENDER_LABEL = 'الجنس المستخدم';
export const BF_CALCULATION_ERROR_MESSAGE = 'خطأ في الحساب. تأكد من أن القياسات منطقية.';
export const HEIGHT_GENDER_REQUIRED_FOR_BF_MESSAGE = 'يجب إدخال الطول والجنس في الحاسبة الرئيسية أولاً.';

// Error Messages
export const AUTH_SUCCESS_REGISTER = 'تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.';
export const UPGRADE_SUCCESS_MESSAGE = 'تهانينا! تم ترقية حسابك إلى بريميوم.';
export const USER_ALREADY_EXISTS_ERROR = 'هذا البريد الإلكتروني مسجل بالفعل.';
export const INVALID_CREDENTIALS_ERROR = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
export const PASSWORD_MISMATCH_ERROR = 'كلمتا المرور غير متطابقتين.';
export const INVALID_CURRENT_PASSWORD_ERROR = 'كلمة المرور الحالية غير صحيحة.';
export const EMAIL_NOT_FOUND_ERROR = 'البريد الإلكتروني غير مسجل.';
export const LIMIT_REACHED_ERROR = (item: string) => `لقد وصلت إلى الحد الأقصى لـ ${item} المسموح به في الباقة المجانية. قم بالترقية للاستمرار.`;
export const PREMIUM_ONLY_FEATURE_ERROR = (feature: string) => `ميزة "${feature}" متاحة فقط لمشتركي بريميوم.`;
export const PREMIUM_FEATURE_LABEL = 'ميزة بريميوم';
export const FOOD_ADDED_SUCCESS = 'تمت إضافة الطعام بنجاح.';
export const FOOD_COPIED_SUCCESS = 'تم نسخ الطعام بنجاح إلى قائمة أطعمتك.';
export const FOOD_UPDATED_SUCCESS = 'تم تحديث الطعام بنجاح.';
export const FOOD_DELETED_SUCCESS = 'تم حذف الطعام بنجاح.';
export const ERROR_UPDATING_FOOD = 'حدث خطأ أثناء تحديث الطعام.';
export const ERROR_DELETING_FOOD = 'حدث خطأ أثناء حذف الطعام.';
export const RECIPE_SAVED_SUCCESSFULLY = 'تم حفظ الوصفة بنجاح.';
export const ERROR_SAVING_RECIPE = 'حدث خطأ أثناء حفظ الوصفة.';
export const RECIPE_DELETED_SUCCESSFULLY = 'تم حذف الوصفة بنجاح.';
export const ERROR_DELETING_RECIPE = 'حدث خطأ أثناء حذف الوصفة.';
export const ENTRY_SAVED_SUCCESS = 'تم حفظ القراءة بنجاح.';
export const PLAN_SAVED_SUCCESS = 'تم حفظ الخطة بنجاح.';
export const ERROR_SAVING_PLAN = 'حدث خطأ أثناء حفظ الخطة.';
export const PLAN_DELETED_SUCCESS = 'تم حذف الخطة بنجاح.';
export const ERROR_DELETING_PLAN = 'حدث خطأ أثناء حذف الخطة.';
export const DEFAULT_WATER_GOAL_ML = 2500;

// Ideal Body Fat Calculator
export const BF_RECOMMENDATIONS = {
    below: "نسبة دهونك الحالية أقل من النطاق المثالي لنشاطك، مما قد يؤثر على الأداء والهرمونات. قد يكون من المفيد زيادة السعرات بشكل طفيف للوصول إلى النطاق الصحي.",
    above: "نسبة دهونك الحالية أعلى من النطاق المثالي لنشاطك. للوصول إلى أفضل أداء ومظهر، يُنصح بخفض نسبة الدهون من خلال عجز معتدل في السعرات الحرارية.",
    ideal: "تهانينا! نسبة دهونك تقع ضمن النطاق المثالي لنشاطك. حافظ على هذا المستوى للحصول على أفضل أداء وصحة."
};

// Advanced Calorie Service
export const MEDICAL_CONDITION_GUIDELINES: Record<MedicalCondition, { title: string, points: string[] }> = {
    [MedicalCondition.NONE]: { title: '', points: [] },
    [MedicalCondition.HYPOTHYROIDISM]: {
        title: 'إرشادات لقصور الغدة الدرقية',
        points: [
            "قد تحتاج إلى سعرات أقل قليلاً (100-200 سعرة) من المحسوبة بسبب تباطؤ الأيض.",
            "اهتم باليود والسيلينيوم والزنك، وهي معادن مهمة لوظيفة الغدة الدرقية.",
            "تجنب الإفراط في تناول الخضروات الصليبية النيئة (مثل البروكلي والملفوف)."
        ]
    },
    [MedicalCondition.HYPERTHYROIDISM]: {
        title: 'إرشادات لفرط نشاط الغدة الدرقية',
        points: [
            "قد تحتاج إلى سعرات أعلى (200-300 سعرة) من المحسوبة بسبب زيادة معدل الأيض.",
            "ركز على الكالسيوم وفيتامين د لأن فرط نشاط الغدة قد يؤثر على كثافة العظام.",
            "قلل من تناول الكافيين والمنبهات."
        ]
    },
    [MedicalCondition.PCOS]: {
        title: 'إرشادات لمتلازمة تكيس المبايض',
        points: [
            "نظام غذائي منخفض الكربوهيدرات أو معتدل الكربوهيدرات مع التركيز على الكربوهيدرات المعقدة (ذات المؤشر الجلايسيمي المنخفض) هو الأفضل.",
            "الدهون الصحية والبروتين الكافي يساعدان في التحكم بالشهية ومقاومة الأنسولين.",
            "فكر في إضافة مكملات مثل الإينوزيتول بعد استشارة الطبيب."
        ]
    },
    [MedicalCondition.DIABETES_TYPE_1]: {
        title: 'إرشادات للسكري النوع الأول',
        points: [
            "هذه الخطة لا تأخذ في الاعتبار جرعات الأنسولين. يجب موازنة الكربوهيدرات بدقة مع الأنسولين تحت إشراف طبي صارم.",
            "التركيز على الكربوهيدرات المعقدة والألياف لتجنب الارتفاعات الحادة في سكر الدم."
        ]
    },
    [MedicalCondition.DIABETES_TYPE_2]: {
        title: 'إرشادات للسكري النوع الثاني',
        points: [
            "التحكم في كمية ونوعية الكربوهيدرات هو المفتاح. غالبًا ما يكون النظام الغذائي منخفض الكربوهيدرات فعالًا.",
            "زيادة الألياف من الخضروات والبقوليات تساعد في تنظيم سكر الدم.",
            "النشاط البدني المنتظم ضروري لتحسين حساسية الأنسولين."
        ]
    },
    [MedicalCondition.GESTATIONAL_DIABETES]: {
        title: 'إرشادات لسكري الحمل',
        points: [
            "يجب مراقبة الكربوهيدرات بدقة وتوزيعها على مدار اليوم لتجنب ارتفاع سكر الدم.",
            "يجب أن تكون كل وجبة متوازنة وتحتوي على بروتين ودهون صحية مع الكربوهيدرات.",
            "المتابعة مع الطبيب وأخصائي التغذية إلزامية."
        ]
    },
    [MedicalCondition.HYPERTENSION]: {
        title: 'إرشادات لارتفاع ضغط الدم',
        points: [
            "تقليل الصوديوم (الملح) إلى أقل من 2300 مجم يوميًا، ويفضل 1500 مجم.",
            "زيادة البوتاسيوم من مصادر طبيعية مثل الخضروات والفواكه.",
            "اتبع نظامًا غذائيًا غنيًا بالحبوب الكاملة والبروتينات الخالية من الدهون والدهون الصحية (مثل نظام DASH)."
        ]
    }
};

// Plateu Advice Modal
export const PLATEAU_ADVICE_MODAL_TITLE = "تحليل ثبات الوزن";
export const GENERATING_ADVICE_MESSAGE = "يقوم مساعد رشيق بتحليل بياناتك لتقديم أفضل نصيحة...";
export const PLATEAU_ADVICE_ERROR = "حدث خطأ أثناء توليد النصيحة.";
export const PLATEAU_ADVICE_SUBTITLE = "نصيحة مخصصة من الذكاء الاصطناعي لمساعدتك على كسر ثبات الوزن.";
export const PLATEAU_WEIGHT_TREND_TITLE = "تحليل اتجاه الوزن";
export const PLATEAU_WEIGHT_TREND_DESCRIPTION = (start: number, end: number, count: number) => `تغير وزنك من ${start} كجم إلى ${end} كجم خلال آخر ${count} قراءات.`;
export const PLATEAU_AI_ACTIONS_TITLE = "إجراءات مقترحة";
export const PLATEAU_GOTO_CALCULATOR_BUTTON = "تعديل السعرات";
export const PLATEAU_GOTO_BURNED_CALORIES_BUTTON = "زيادة النشاط";

// Daily Diary
export const DAILY_DIARY_TITLE = 'يومياتي الغذائية';
export const SELECT_DATE_LABEL = 'اختر التاريخ:';
export const DIARY_SUMMARY_TITLE = 'ملخص اليوم';
export const TARGET_LABEL = 'الهدف';
export const CONSUMED_LABEL = 'المستهلك';
export const REMAINING_LABEL = 'المتبقي';
export const NET_CALORIES_LABEL = 'صافي السعرات';
export const BURNED_LABEL = 'المحروق';
export const MEALS_LOGGED_TITLE = 'الوجبات المسجلة';
export const EXERCISES_LOGGED_TITLE = 'التمارين المسجلة';
export const ADD_FOOD_TO_DIARY_BUTTON = 'إضافة طعام';
export const ADD_EXERCISE_TO_DIARY_BUTTON = 'إضافة تمرين';
export const NO_FOOD_LOGGED_YET = 'لم تسجل أي وجبات لهذا اليوم.';
export const NO_EXERCISES_LOGGED_YET = 'لم تسجل أي تمارين لهذا اليوم.';
export const DELETE_LOG_ENTRY_CONFIRM = 'هل أنت متأكد أنك تريد حذف هذا السجل؟';
export const ADD_LOG_ENTRY_BUTTON = 'إضافة للسجل';
export const SEARCH_RECIPES_AND_FOODS = 'ابحث عن وصفة أو طعام...';
export const QUANTITY_LABEL = 'الكمية';
export const QUICK_ADD_FOOD_TITLE = 'إضافة سريعة';
export const WATER_TRACKING_TITLE = "متابعة شرب الماء";
export const WATER_CUP_SIZE_ML = 250;
export const WATER_HYDRATION_GUIDE_LINK = "دليل لون البول";
export const LOG_FROM_PLAN_BUTTON = "تسجيل من الخطة";
export const NO_SAVED_PLANS_TO_LOG = "لا توجد خطط محفوظة لتسجيلها.";
export const LOG_FROM_PLAN_CONFIRM = "سيتم تسجيل وجبات اليوم الأول من أحدث خطة محفوظة لديك في يوميات اليوم. هل تريد المتابعة؟";

// Urine Chart Modal
export const URINE_CHART_TITLE = "دليل ترطيب الجسم";
export const URINE_CHART_INSTRUCTIONS = "استخدم لون البول كدليل تقريبي لحالة ترطيب جسمك.";
export const URINE_CHART_LEVELS = [
    { color: '#F7F6C5', title: 'ترطيب ممتاز', description: 'أنت تشرب كمية كافية من الماء.' },
    { color: '#E8E184', title: 'ترطيب جيد', description: 'حالتك جيدة، استمر في الشرب بانتظام.' },
    { color: '#D4C750', title: 'ترطيب مقبول', description: 'يمكنك شرب كوب من الماء الآن.' },
    { color: '#BFA83B', title: 'بداية جفاف', description: 'جسمك بحاجة إلى الماء. اشرب كوبين من الماء.' },
    { color: '#A9882E', title: 'جفاف', description: 'أنت تعاني من الجفاف. اشرب الماء فورًا.' },
    { color: '#8F6C24', title: 'جفاف شديد', description: 'جفاف حاد. اشرب كميات كبيرة من الماء واسترح.' },
];

// Generation Progress Modal
export const GENERATION_TIPS = [
    "نصيحة: البروتين يساعد على الشعور بالشبع لفترة أطول.",
    "نصيحة: شرب كمية كافية من الماء ضروري لعملية الأيض.",
    "نصيحة: النوم الجيد لا يقل أهمية عن النظام الغذائي والتمارين.",
    "نصيحة: الألياف من الخضروات والحبوب الكاملة تدعم صحة الجهاز الهضمي.",
    "نصيحة: الدهون الصحية (مثل الأفوكادو والمكسرات) ضرورية لإنتاج الهرمونات.",
];

// Analyze Meal From Photo
export const ANALYZE_MEAL_FROM_PHOTO_TITLE = "تحليل الوجبة بالصورة";
export const ANALYZE_MEAL_FROM_PHOTO_DESCRIPTION = "التقط صورة لوجبتك أو اخترها من معرض الصور، وسيقوم الذكاء الاصطناعي بتقدير مكوناتها وسعراتها الحرارية.";
export const TAKE_PHOTO_BUTTON = "التقط صورة";
export const CHOOSE_FROM_GALLERY_BUTTON = "اختر من المعرض";
export const ANALYZING_IMAGE_MESSAGE = "يقوم مساعد رشيق بفحص الصورة... قد يستغرق هذا بضع لحظات.";
export const ANALYSIS_RESULTS_TITLE = "نتائج التحليل";
export const ADJUST_QUANTITIES_PROMPT = "هذه تقديرات أولية. يمكنك تعديل الكميات يدويًا للحصول على دقة أفضل.";
export const SAVE_AS_RECIPE_BUTTON = "مراجعة وحفظ كـ وصفة";
export const MACRO_DISTRIBUTION_CHART_TITLE = "توزيع الماكروز";
export const UNMATCHED_INGREDIENTS_WARNING_TITLE = "مكونات غير معروفة";
export const UNMATCHED_INGREDIENTS_WARNING_BODY = "لم يتم العثور على المكونات التالية في قاعدة بياناتك. يمكنك إضافتها يدويًا.";
export const IMAGE_ANALYSIS_ERROR_MESSAGE = "حدث خطأ أثناء تحليل الصورة.";
export const START_OVER_BUTTON = "البدء من جديد";
export const SEARCH_AND_ADD_BUTTON = "بحث وإضافة";
export const AI_SEARCH_FAILED_ERROR = "فشل البحث التلقائي. يرجى إدخال البيانات يدويًا.";
export const SEARCHING_FOR_INFO = "جاري البحث...";

// Settings
export const SETTINGS_TITLE = "الإعدادات";
export const ACCOUNT_INFO_TITLE = "معلومات الحساب";
export const CURRENT_PLAN_LABEL = "الباقة الحالية:";
export const PREMIUM_PLAN_LABEL = "بريميوم";
export const FREE_PLAN_LABEL = "مجاني";
export const CHANGE_PASSWORD_TITLE = "تغيير كلمة المرور";
export const CURRENT_PASSWORD_LABEL = "كلمة المرور الحالية";
export const NEW_PASSWORD_LABEL = "كلمة المرور الجديدة";
export const CONFIRM_NEW_PASSWORD_LABEL = "تأكيد كلمة المرور الجديدة";
export const SAVE_PASSWORD_BUTTON = "حفظ كلمة المرور";
export const SUBSCRIPTION_MANAGEMENT_TITLE = "إدارة الاشتراك";
export const CANCEL_SUBSCRIPTION_BUTTON = "إلغاء الاشتراك";
export const CONFIRM_CANCEL_SUB_TITLE = "تأكيد إلغاء الاشتراك";
export const CONFIRM_CANCEL_SUB_MESSAGE = "هل أنت متأكد أنك تريد إلغاء اشتراكك؟ ستفقد الوصول إلى جميع الميزات المميزة في نهاية دورة الفوترة الحالية.";
export const THEME_SETTINGS_TITLE = "إعدادات المظهر";
export const PASSWORD_CHANGE_SUCCESS = "تم تغيير كلمة المرور بنجاح.";
export const NEW_PASSWORD_MISMATCH_ERROR = "كلمتا المرور الجديدتان غير متطابقتين.";
export const DOWNGRADE_SUCCESS_MESSAGE = "تم إلغاء اشتراكك. ستعود إلى الباقة المجانية في نهاية فترة الفوترة.";

// AI Recipe Generator
export const AI_RECIPE_GENERATOR_TITLE = "مولد الوصفات الذكي";
export const AI_RECIPE_GENERATOR_DESCRIPTION = "صف لنا المكونات التي لديك أو اسم وجبة، وسيقوم مساعد رشيق بابتكار وصفة صحية لك.";
export const AI_PROMPT_INGREDIENTS_LABEL = "المكونات أو اسم الوجبة";
export const AI_PROMPT_INGREDIENTS_PLACEHOLDER = "مثال: صدر دجاج، أرز، بروكلي\nأو: كبسة دجاج صحية";
export const AI_PROMPT_MEAL_TYPE_LABEL = "نوع الوجبة";
export const AI_PROMPT_DIET_STYLE_LABEL = "نمط غذائي أو ملاحظات (اختياري)";
export const AI_PROMPT_DIET_STYLE_PLACEHOLDER = "مثال: قليل الكربوهيدرات، نباتي، بدون غلوتين";
export const GENERATE_RECIPE_BUTTON = "توليد الوصفة";
export const GENERATING_RECIPE_MESSAGE = "يقوم مساعد رشيق بابتكار وصفتك... قد يستغرق هذا بضع لحظات.";
export const AI_RECIPE_RESULT_TITLE = "الوصفة المقترحة";
export const EDIT_AND_SAVE_AI_RECIPE_BUTTON = "مراجعة وتعديل الوصفة";
export const AI_ERROR_MESSAGE = "حدث خطأ أثناء توليد الوصفة.";
export const AI_PROMPT_MIN_CALORIES_LABEL = "أقل عدد سعرات (للحصة)";
export const AI_PROMPT_MAX_CALORIES_LABEL = "أعلى عدد سعرات (للحصة)";

// Reports
export const REPORTS_TITLE = "التقارير";
export const REPORTS_DESCRIPTION = "حلل تقدمك بمرور الوقت من خلال مقارنة وزنك مع استهلاكك للسعرات الحرارية.";
export const REPORTS_DATE_RANGE_LABEL = "عرض النطاق الزمني:";
export const REPORTS_LAST_7_DAYS = "آخر 7 أيام";
export const REPORTS_LAST_30_DAYS = "آخر 30 يومًا";
export const REPORTS_WEIGHT_VS_CALORIES_TITLE = "مقارنة الوزن بالسعرات الحرارية";
export const REPORTS_AVG_CALORIES_LABEL = "متوسط السعرات اليومي";
export const REPORTS_WEIGHT_CHANGE_LABEL = "التغير في الوزن";
export const REPORTS_NO_DATA = "لا توجد بيانات كافية لعرض التقارير. يرجى تسجيل المزيد من الأيام في يومياتك.";

// Supplements Guide
export const SUPPLEMENTS_GUIDE_TITLE = "دليل المكملات الذكي";
export const SUPPLEMENTS_GUIDE_DESCRIPTION = "احصل على توصيات مخصصة للمكملات الغذائية بناءً على بياناتك وأهدافك.";
export const SUPPLEMENTS_MEDICAL_DISCLAIMER = "هذه المعلومات هي لأغراض تثقيفية فقط ولا تعتبر نصيحة طبية. استشر طبيبك دائمًا قبل تناول أي مكملات غذائية.";

// Micronutrient Analysis
export const MICRONUTRIENT_ANALYSIS_TITLE = "تحليل الفيتامينات والمعادن";
export const MICRONUTRIENT_ANALYSIS_DESCRIPTION = "تعرف على احتياجاتك اليومية الموصى بها من الفيتامينات والمعادن الأساسية بناءً على عمرك وجنسك ومستوى نشاطك.";
export const MICRONUTRIENT_NO_DATA = "لحساب احتياجاتك، يرجى إدخال بياناتك في الحاسبة أولاً.";
export const MICRONUTRIENT_CARD_RDA_LABEL = "الكمية الموصى بها:";
export const MICRONUTRIENT_CARD_IMPORTANCE_LABEL = "الأهمية:";
export const MICRONUTRIENT_CARD_SOURCES_LABEL = "أهم المصادر الغذائية:";
export const MICRONUTRIENT_CARD_DEFICIENCY_LABEL = "أعراض النقص الشائعة:";
export const MICRONUTRIENT_ESPECIALLY_IMPORTANT = "مهم بشكل خاص لك";

// Body Composition Analysis
export const BODY_COMPOSITION_TITLE = "تحليل تكوين الجسم المتقدم";
export const BODY_COMPOSITION_DESCRIPTION = "احصل على تحليل شامل يتجاوز مجرد نسبة الدهون، بما في ذلك الكتلة العضلية والمؤشرات الصحية الهامة.";
export const CALCULATE_BODY_COMPOSITION_BUTTON = "تحليل تكوين الجسم";
export const USER_DATA_MISSING_ERROR = "يرجى إدخال بياناتك الأساسية (الطول والوزن) في الحاسبة أولاً.";
export const COMPOSITION_RESULTS_TITLE = "نتائج التحليل";
export const BF_RESULT_TITLE = "نسبة الدهون";
export const FFMI_RESULT_TITLE = "مؤشر الكتلة الخالية من الدهون (FFMI)";
export const HEALTH_RISK_INDICATORS_TITLE = "مؤشرات المخاطر الصحية";
export const ANALYSIS_AND_RECOMMENDATION_TEXT = "التحليل والتوصية";
export const FAT_MASS_LABEL_COMPOSITION = "كتلة الدهون";
export const LEAN_MASS_LABEL_COMPOSITION = "الكتلة الصافية";
export const WHR_LABEL = "نسبة الخصر إلى الأرداف (WHR)";
export const WAIST_CIRCUMFERENCE_LABEL = "محيط الخصر";

// Tuna Warning in Meal Plan
export const TUNA_WARNING_TITLE = "⚠️ تنبيه هام بخصوص استهلاك التونة";
export const TUNA_WARNING_INTRO = (weight: number) => `بناءً على وزنك (~${weight} كجم)، الحد الأقصى الموصى به من التونة أسبوعيًا لتجنب تراكم الزئبق هو حوالي ${(weight * 1.5).toFixed(0)} جرام.`;
export const TUNA_WARNING_NOTICE = "تحتوي خطتك على وصفات تستخدم التونة. يرجى الانتباه لهذه الإرشادات العامة:";
export const TUNA_WARNING_GUIDELINES = [
    { type: "تونة خفيفة (Light Tuna)", limit: "آمنة بشكل عام ضمن الحد المحسوب." },
    { type: "تونة الباكور (Albacore)", limit: "يفضل استهلاك كمية أقل منها (حوالي ثلث الكمية الموصى بها)." },
    { type: "الحوامل والمرضعات", limit: "يجب استشارة الطبيب." }
];

// MealPlanContext error messages
export const PLAN_ADJUSTED_SUCCESSFULLY = "تم تعديل الخطة بنجاح!";
export const PLAN_ADJUSTMENT_ERROR_NO_TARGET_MACROS = "خطأ: لا يمكن تعديل الخطة بدون تحديد هدف للسعرات.";
export const PLAN_ADJUSTMENT_ERROR_NO_RECIPES = "خطأ: يجب تعيين وصفات لجميع الوجبات قبل التعديل.";
export const PLAN_ADJUSTMENT_ERROR_ZERO_CALORIES = "خطأ: مجموع السعرات في الوجبات المحددة هو صفر.";
export const DAILY_LIMIT_REACHED_ERROR = (feature: string, limit: number) => `لقد وصلت إلى الحد الأقصى للاستخدام اليومي لـ ${feature} (${limit} مرات) في الباقة المجانية.`;
export const PLAN_LOADED_SUCCESS = "تم تحميل الخطة بنجاح!";
export const GENERATING_AI_PLAN_MESSAGE = "جاري توليد الخطة...";
export const AI_PLAN_GENERATED_SUCCESS = "تم توليد الخطة الذكية بنجاح!";
export const AI_PLAN_GENERATION_ERROR = "حدث خطأ أثناء توليد الخطة الذكية.";
export const MIN_RECIPES_FOR_PLAN_ERROR = "لإنشاء خطة تلقائية، تحتاج إلى 3 وصفات على الأقل (واحدة لكل من الفطور، الغداء، والعشاء).";
export const INSUFFICIENT_RECIPES_MULTI_DAY_WARNING = "لا يمكن إنشاء خطة متعددة الأيام بـ 3 وصفات فقط. يرجى إضافة المزيد من الوصفات للتنويع.";
export const PLAN_3_RECIPES_PARTIAL_FILL_NOTICE = "تم تعديل الوجبات الثلاث الأولى بنجاح. يرجى تعبئة باقي الوجبات يدويًا.";