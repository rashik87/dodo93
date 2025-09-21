


import { Gender, BodyCompositionResult } from '../types';

// U.S. Navy Body Fat Formula (Hodgdon and Beckett, 1984) using Siri Equation
// All measurements in centimeters. Height in centimeters.
export const calculateNavyBodyFatPercentage = (
    gender: Gender,
    heightCm: number,
    neckCm: number,
    waistCm: number,
    hipCm?: number // Only for females
): number => {
    let percentage: number;

    if (heightCm <= 0 || neckCm <= 0 || waistCm <= 0) return NaN;

    if (gender === Gender.MALE) {
        if (waistCm - neckCm <= 0) return NaN; // log10 argument must be > 0
        const bodyDensity = 1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm);
        percentage = (495 / bodyDensity) - 450;

    } else { // FEMALE
        if (!hipCm || hipCm <= 0) return NaN;
        if (waistCm + hipCm - neckCm <= 0) return NaN; // log10 argument must be > 0
        const bodyDensity = 1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm);
        percentage = (495 / bodyDensity) - 450;
    }
    
    const roundedPercentage = parseFloat(percentage.toFixed(1));

    if (isNaN(roundedPercentage) || !isFinite(roundedPercentage)) return NaN;
    
    return Math.max(0, Math.min(100, roundedPercentage));
};


// --- Comprehensive Body Composition Analysis ---

const BF_COMPOSITION_CATEGORIES_MALE_ADULT = {
    Essential: { min: 2, max: 10, label: 'أقل من الأساسي' },
    Fitness: { min: 10.1, max: 18, label: 'لياقة بدنية' },
    Acceptable: { min: 18.1, max: 25, label: 'صحة عامة' },
    Obese: { min: 25.1, max: Infinity, label: 'سمنة' }
};

const BF_COMPOSITION_CATEGORIES_FEMALE_ADULT = {
    Essential: { min: 10, max: 16, label: 'أقل من الأساسي' },
    Fitness: { min: 16.1, max: 25, label: 'لياقة بدنية' },
    Acceptable: { min: 25.1, max: 30, label: 'صحة عامة' },
    Obese: { min: 30.1, max: Infinity, label: 'سمنة' }
};

const FFMI_CATEGORIES_MALE = {
    Low: { min: 0, max: 17.9, label: 'أقل من المتوسط' },
    Normal: { min: 18, max: 20, label: 'متوسط' },
    Advanced: { min: 20.1, max: 22, label: 'رياضي' },
    VeryHigh: { min: 22.1, max: 25, label: 'عالي (قريب من الحد الطبيعي)' },
    PossibleSteroidUse: { min: 25.1, max: Infinity, label: 'مرتفع جدًا (قد يشير إلى استخدام محفزات أداء)'}
};

const FFMI_CATEGORIES_FEMALE = {
    Low: { min: 0, max: 13.9, label: 'أقل من المتوسط' },
    Normal: { min: 14, max: 16, label: 'متوسط' },
    Advanced: { min: 16.1, max: 18, label: 'رياضية' },
    VeryHigh: { min: 18.1, max: Infinity, label: 'ممتازة' }
};

export const analyzeBodyComposition = (
    gender: Gender,
    age: number,
    heightCm: number,
    weightKg: number,
    neckCm: number,
    waistCm: number,
    hipCm?: number
): BodyCompositionResult | string => {

    if (age < 18) {
        const finalBfPercentage = calculateNavyBodyFatPercentage(gender, heightCm, neckCm, waistCm, hipCm);
        if (isNaN(finalBfPercentage)) {
            return "خطأ في حساب نسبة الدهون. تأكد من أن القياسات المدخلة منطقية (مثال: محيط الخصر أكبر من محيط العنق للرجال).";
        }
        
        const finalFatMass = weightKg * (finalBfPercentage / 100);
        const finalLeanMass = weightKg - finalFatMass;

        const TEEN_BF_CATEGORIES_MALE = {
            Low: { min: 0, max: 9.9, label: 'أقل من الطبيعي' },
            Healthy: { min: 10, max: 25, label: 'نطاق صحي' },
            High: { min: 25.1, max: Infinity, label: 'أعلى من الطبيعي' }
        };

        const TEEN_BF_CATEGORIES_FEMALE = {
            Low: { min: 0, max: 19.9, label: 'أقل من الطبيعي' },
            Healthy: { min: 20, max: 32, label: 'نطاق صحي' },
            High: { min: 32.1, max: Infinity, label: 'أعلى من الطبيعي' }
        };

        const getTeenBfCategory = () => {
            const categories = gender === Gender.MALE ? TEEN_BF_CATEGORIES_MALE : TEEN_BF_CATEGORIES_FEMALE;
            if (finalBfPercentage <= categories.Low.max) return { category: 'Low', label: categories.Low.label };
            if (finalBfPercentage <= categories.Healthy.max) return { category: 'Healthy', label: categories.Healthy.label };
            return { category: 'High', label: categories.High.label };
        };
        const bfData = getTeenBfCategory();

        let bfAnalysis = '';
        if (bfData.category === 'High') {
            bfAnalysis = "نسبة الدهون أعلى من النطاق الصحي الموصى به للمراهقين. يُنصح بالتركيز على عادات الأكل الصحية وزيادة النشاط البدني بدلاً من اتباع أنظمة غذائية قاسية. استشر طبيبًا أو أخصائي تغذية.";
        } else if (bfData.category === 'Healthy') {
            bfAnalysis = "تهانينا! نسبة دهونك تقع ضمن النطاق الصحي الموصى به لعمرك. حافظ على عاداتك الصحية لدعم نموك وتطورك.";
        } else { // Low
            bfAnalysis = "نسبة الدهون أقل من النطاق الصحي، مما قد يؤثر على النمو والتطور الهرموني. من المهم التأكد من تناول سعرات حرارية كافية ومغذيات لدعم صحتك. استشر طبيبًا.";
        }
        
        const waistAtRisk = gender === Gender.MALE ? waistCm > 90 : waistCm > 80;

        return {
            bodyFat: {
                percentage: finalBfPercentage,
                category: bfData.category as any,
                categoryLabel: bfData.label,
                fatMass: parseFloat(finalFatMass.toFixed(1)),
                leanMass: parseFloat(finalLeanMass.toFixed(1)),
                analysis: bfAnalysis
            },
            ffmi: {
                value: 0,
                category: 'Not Applicable',
                categoryLabel: 'لا ينطبق',
                analysis: 'مؤشر FFMI غير مصمم للاستخدام مع المراهقين والأطفال تحت سن 18 عامًا، حيث أن تكوين الجسم يتغير باستمرار خلال فترة النمو. يتم الاعتماد على نسب الدهون ومؤشر كتلة الجسم كأدوات تقييم أساسية في هذه المرحلة.'
            },
            waistCircumference: {
                 value: waistCm,
                 isAtRisk: waistAtRisk,
                 riskLabel: waistAtRisk ? 'يحتاج متابعة ⚠️' : 'طبيعي ✅',
                 analysis: `محيط الخصر هو مؤشر مهم للصحة. بالنسبة للمراهقين، من المهم مراقبته كجزء من متابعة النمو الصحي.`
            },
            whr: {
                value: null,
                isAtRisk: false,
                riskLabel: 'لا ينطبق',
                analysis: 'مؤشر WHR غير موصى به كأداة تشخيص أساسية للمراهقين. التركيز يكون على متابعة النمو بشكل عام.'
            }
        };
    }


    const finalBfPercentage = calculateNavyBodyFatPercentage(gender, heightCm, neckCm, waistCm, hipCm);
    if (isNaN(finalBfPercentage)) {
        return "خطأ في حساب نسبة الدهون. تأكد من أن القياسات المدخلة منطقية (مثال: محيط الخصر أكبر من محيط العنق للرجال).";
    }

    const finalFatMass = weightKg * (finalBfPercentage / 100);
    const finalLeanMass = weightKg - finalFatMass;
    const heightInMeters = heightCm / 100;
    const finalFfmi = parseFloat((finalLeanMass / (heightInMeters * heightInMeters)).toFixed(1));

    const waistRiskThreshold = gender === Gender.MALE ? 102 : 88;
    const waistAtRisk = waistCm > waistRiskThreshold;
    let whrAtRisk = false;
    let whrValue: number | null = null;
    if (hipCm && hipCm > 0) {
        whrValue = parseFloat((waistCm / hipCm).toFixed(2));
        const whrRiskThreshold = gender === Gender.MALE ? 0.95 : 0.86;
        whrAtRisk = whrValue > whrRiskThreshold;
    }
    
    const getBfCategory = () => {
        const categories = gender === Gender.MALE ? BF_COMPOSITION_CATEGORIES_MALE_ADULT : BF_COMPOSITION_CATEGORIES_FEMALE_ADULT;
        if (finalBfPercentage < categories.Essential.max) return { category: 'Essential', label: categories.Essential.label };
        if (finalBfPercentage <= categories.Fitness.max) return { category: 'Fitness', label: categories.Fitness.label };
        if (finalBfPercentage <= categories.Acceptable.max) return { category: 'Acceptable', label: categories.Acceptable.label };
        return { category: 'Obese', label: categories.Obese.label };
    };
    const bfData = getBfCategory();

    let bfAnalysis = '';
    if (bfData.category === 'Obese') {
        bfAnalysis = "نسبة دهونك في نطاق السمنة، مما يزيد من المخاطر الصحية. الأولوية القصوى هي خفض الدهون من خلال عجز معتدل في السعرات الحرارية ونشاط بدني منتظم.";
    } else if (bfData.category === 'Acceptable') {
        bfAnalysis = `نسبة دهونك في النطاق الصحي المقبول، لكنها أعلى من النطاق المثالي للرياضيين (${gender === Gender.MALE ? '12-18%' : '16-25%'}). يمكنك تحسين تكوين جسمك بخفض الدهون مع الحفاظ على العضلات.`;
    } else if (bfData.category === 'Fitness') {
        bfAnalysis = "تهانينا! نسبة دهونك في نطاق اللياقة البدنية المثالي. هذا المستوى يدعم الأداء الرياضي والصحة العامة بشكل ممتاز. حافظ على هذا المستوى.";
    } else { // Essential
        bfAnalysis = "نسبة دهونك منخفضة جدًا وقد تكون أقل من المستوى الضروري للصحة الهرمونية والوظائف الحيوية. قد يكون من المفيد زيادة السعرات قليلاً للوصول إلى نطاق أكثر صحة.";
    }

    const getFfmiCategory = () => {
        const categories = gender === Gender.MALE ? FFMI_CATEGORIES_MALE : FFMI_CATEGORIES_FEMALE;
        if (finalFfmi <= categories.Low.max) return { category: 'Low', label: categories.Low.label };
        if (finalFfmi <= categories.Normal.max) return { category: 'Normal', label: categories.Normal.label };
        if (finalFfmi <= categories.Advanced.max) return { category: 'Advanced', label: categories.Advanced.label };
        if (gender === Gender.MALE && finalFfmi <= FFMI_CATEGORIES_MALE.VeryHigh.max) return { category: 'VeryHigh', label: FFMI_CATEGORIES_MALE.VeryHigh.label };
        if (gender === Gender.MALE && finalFfmi > FFMI_CATEGORIES_MALE.VeryHigh.max) return { category: 'PossibleSteroidUse', label: FFMI_CATEGORIES_MALE.PossibleSteroidUse.label };
        return { category: 'VeryHigh', label: categories.VeryHigh.label };
    };
    const ffmiData = getFfmiCategory();

    let ffmiAnalysis = '';
    switch (ffmiData.category) {
        case 'Low': ffmiAnalysis = "كتلتك العضلية أقل من المتوسط. نوصي بالتركيز بشكل أساسي على تمارين المقاومة وتناول كمية كافية من البروتين (1.6-2.2 غ/كغ) لبناء أساس عضلي قوي."; break;
        case 'Normal': ffmiAnalysis = "لديك مستوى متوسط وجيد من الكتلة العضلية. يمكنك تطويرها بشكل أكبر من خلال الاستمرار في تمارين المقاومة المتقدمة."; break;
        case 'Advanced': ffmiAnalysis = "لديك كتلة عضلية متقدمة تدل على التزامك بالتدريب. استمر في تطبيق الحمل التدريجي لتحدي عضلاتك."; break;
        case 'VeryHigh': ffmiAnalysis = "لديك كتلة عضلية ممتازة وقريبة من الحد الأقصى الطبيعي. أنت في مستوى رياضي متقدم جدًا."; break;
        case 'PossibleSteroidUse': ffmiAnalysis = "مستوى كتلتك العضلية مرتفع جدًا ويتجاوز ما يمكن تحقيقه طبيعيًا لمعظم الناس. هذا المستوى غالبًا ما يرتبط باستخدام محفزات الأداء."; break;
    }
    
    let waistAnalysis = '';
    if (waistAtRisk) {
        waistAnalysis = `محيط خصرك أعلى من الحد الصحي (${waistRiskThreshold} سم)، مما يعد مؤشرًا قويًا على زيادة الدهون الحشوية وزيادة المخاطر الصحية المرتبطة بأمراض القلب والسكري. خفضه يجب أن يكون أولوية.`;
    } else {
        waistAnalysis = `محيط خصرك ضمن النطاق الصحي، مما يعد مؤشرًا جيدًا على انخفاض المخاطر الصحية المرتبطة بالدهون الحشوية.`;
    }

    let whrAnalysis = '';
    if (whrValue) {
        if (whrAtRisk) {
            whrAnalysis = `نسبة الخصر إلى الأرداف لديك مرتفعة، مما قد يشير إلى توزيع دهون مركزي (شكل التفاحة) ويرتبط بزيادة المخاطر الصحية.`;
        } else {
            whrAnalysis = `نسبة الخصر إلى الأرداف لديك في النطاق الصحي، مما يشير إلى توزيع دهون صحي وتقليل المخاطر المرتبطة به.`;
        }
    } else {
        whrAnalysis = "لم يتم حساب هذا المؤشر لعدم إدخال قياس الأرداف.";
    }

    return {
        bodyFat: {
            percentage: finalBfPercentage,
            category: bfData.category as any,
            categoryLabel: bfData.label,
            fatMass: parseFloat(finalFatMass.toFixed(1)),
            leanMass: parseFloat(finalLeanMass.toFixed(1)),
            analysis: bfAnalysis
        },
        ffmi: {
            value: finalFfmi,
            category: ffmiData.category as any,
            categoryLabel: ffmiData.label,
            analysis: ffmiAnalysis
        },
        waistCircumference: {
            value: waistCm,
            isAtRisk: waistAtRisk,
            riskLabel: waistAtRisk ? 'خطر ⚠️' : 'آمن ✅',
            analysis: waistAnalysis
        },
        whr: {
            value: whrValue,
            isAtRisk: whrAtRisk,
            riskLabel: whrValue ? (whrAtRisk ? 'خطر ⚠️' : 'آمن ✅') : 'N/A',
            analysis: whrAnalysis
        },
    };
};