import { UserData, Goal, Gender, AdvancedPlanResult, Macros, PlanPhase, GoalSettings, PlanPhaseType, PregnancyStatus, MedicalCondition, SportActivity } from '../types';
import { calculateBMR, calculateTDEE, calculateProteinGrams } from './calorieService';
import { ESTIMATED_DURATION_LABEL, MEDICAL_CONDITION_GUIDELINES } from '../constants';

const handleSpecialConsiderations = (userData: UserData, bmr: number, tdee: number): { plan: AdvancedPlanResult | null, baseWarnings: string[], guidelines: string[], isOverridden: boolean } => {
    const { age, gender, pregnancyStatus, medicalConditions, weight } = userData;
    let baseWarnings: string[] = [];
    let guidelines: string[] = [];
    let overridePlan: AdvancedPlanResult | null = null;
    let isOverridden = false;

    // Rule for Children/Teens (< 18)
    if (age < 18) {
        const teenMacros: Macros = {
            calories: Math.round(tdee),
            protein: Math.round(weight * 1.5),
            fat: Math.round((tdee * 0.30) / 9),
            carbs: Math.round((tdee - (weight * 1.5 * 4) - (tdee * 0.30)) / 4),
        };
        const teenPlan: AdvancedPlanResult = {
            targetCalories: teenMacros.calories,
            targetMacros: teenMacros,
            estimatedDuration: "مستمر",
            durationContext: "نمو صحي",
            phases: [{
                type: PlanPhaseType.HEALTH_FOCUS,
                name: "خطة النمو الصحي",
                duration: "مستمرة",
                calories: teenMacros.calories,
                macros: teenMacros,
                notes: [
                    "التركيز على تناول سعرات الصيانة لدعم النمو والتطور.",
                    "تشجيع النشاط البدني المنتظم بدلاً من تقليل السعرات.",
                    "ضمان الحصول على ما لا يقل عن 50% من السعرات من الكربوهيدرات للطاقة."
                ]
            }],
            warnings: [
                "لا يُنصح بخطط خسارة الوزن للأطفال والمراهقين إلا تحت إشراف طبي.",
                "تم تصميم هذه الخطة للحفاظ على الوزن ودعم النمو الصحي."
            ],
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            goal: Goal.MAINTAIN_WEIGHT
        };
        return { plan: teenPlan, baseWarnings: [], guidelines: [], isOverridden: true };
    }
    
    const pregnancyGuidelines = [
        "ممنوع تمامًا اتباع أي رجيم لخسارة الوزن.",
        "تمت إضافة 300-500 سعرة حرارية لدعم نمو الجنين (خاصة في الثلث الثاني والثالث).",
        "تمت زيادة البروتين بمقدار 25 جرامًا يوميًا.",
        "ركزي على الدهون الصحية مثل الأوميغا-3 (من الأسماك، الجوز، وبذور الكتان).",
        "اهتمي بالمغذيات الدقيقة: حمض الفوليك، الحديد، الكالسيوم، وفيتامين D.",
        "تجنبي تمامًا: الكحول، الكافيين المفرط، الأجبان غير المبسترة، واللحوم النيئة أو غير المطهوة جيدًا."
    ];

    const breastfeedingGuidelines = [
        "تمت إضافة 500-650 سعرة حرارية لدعم إنتاج الحليب.",
        "تمت زيادة البروتين بمقدار 25 جرامًا يوميًا.",
        "لا ينصح بخسارة وزن تزيد عن 1% من وزن الجسم أسبوعيًا للحفاظ على إدرار الحليب."
    ];


    // Rules for Pregnancy and Breastfeeding
    if (pregnancyStatus === PregnancyStatus.PREGNANT || pregnancyStatus === PregnancyStatus.BREASTFEEDING) {
        const isPregnant = pregnancyStatus === PregnancyStatus.PREGNANT;
        const calorieAddition = isPregnant ? 400 : 500;
        const proteinAddition = 25;
        const targetCalories = tdee + calorieAddition;
        const healthMacros: Macros = {
            calories: Math.round(targetCalories),
            protein: Math.round(weight * 1.5 + proteinAddition),
            fat: Math.round((targetCalories * 0.30) / 9),
            carbs: Math.round((targetCalories - ((weight * 1.5 + proteinAddition) * 4) - (targetCalories * 0.30)) / 4)
        };
        overridePlan = {
            targetCalories: healthMacros.calories,
            targetMacros: healthMacros,
            estimatedDuration: "مستمر",
            durationContext: isPregnant ? "فترة الحمل" : "فترة الرضاعة",
            phases: [{
                type: PlanPhaseType.HEALTH_FOCUS,
                name: isPregnant ? "خطة صحة الأم والجنين" : "خطة دعم الرضاعة",
                duration: "مستمرة",
                calories: healthMacros.calories,
                macros: healthMacros,
                notes: [
                    `تمت إضافة ~${calorieAddition} سعرة و ${proteinAddition} جرام بروتين لدعم احتياجاتك الحالية.`,
                    "التركيز على جودة الطعام والمغذيات الدقيقة."
                ]
            }],
            warnings: [
                "يجب استشارة الطبيب المشرف قبل اتباع أي خطة غذائية أثناء الحمل أو الرضاعة.",
                `تم إلغاء هدف خسارة الوزن، والتركيز الآن على توفير التغذية الكافية لك و لطفلك.`
            ],
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            goal: Goal.MAINTAIN_WEIGHT,
            guidelines: []
        };
        isOverridden = true;
        if(isPregnant) {
             guidelines.push(`### إرشادات للحمل`, ...pregnancyGuidelines);
        } else {
             guidelines.push(`### إرشادات للرضاعة`, ...breastfeedingGuidelines);
        }
    }
    
    if (pregnancyStatus === PregnancyStatus.MENOPAUSE) {
        baseWarnings.push("في سن اليأس، قد يتباطأ الأيض. من المفيد التركيز على الكالسيوم وفيتامين د لصحة العظام، والبروتين للحفاظ على العضلات.");
    }

    if (medicalConditions && medicalConditions.length > 0 && medicalConditions.some(c => c !== MedicalCondition.NONE)) {
        baseWarnings.push("لديك حالات طبية محددة. هذه الخطة هي نقطة انطلاق عامة ويجب تعديلها بعد استشارة طبيبك أو أخصائي تغذية.");
        
        medicalConditions.forEach(condition => {
            const guidelineData = MEDICAL_CONDITION_GUIDELINES[condition];
             if (guidelineData && guidelineData.points.length > 0) {
                guidelines.push(`### ${guidelineData.title}`);
                guidelines.push(...guidelineData.points);
             }
        });
    }
    
    if (isOverridden && overridePlan) {
        overridePlan.warnings.push(...baseWarnings);
        overridePlan.guidelines = guidelines;
        return { plan: overridePlan, baseWarnings: [], guidelines: [], isOverridden: true };
    }

    return { plan: null, baseWarnings, guidelines, isOverridden: false };
};


const addActivityRecommendations = (phases: PlanPhase[], userData: UserData): PlanPhase[] => {
    const isAthlete = userData.sportActivity && ![
        SportActivity.GENERAL_FITNESS, 
        SportActivity.YOGA_PILATES,
        SportActivity.HOME_WORKOUTS,
    ].includes(userData.sportActivity);
    
    if (isAthlete) {
        // Progressive overload for athletes
        return phases.map((phase, index) => {
            if (phase.type === PlanPhaseType.DIET_BREAK || phase.type === PlanPhaseType.HEALTH_FOCUS || phase.type === PlanPhaseType.MAINTENANCE) {
                return { ...phase, activityRecommendation: "خلال هذه المرحلة، ركز على التعافي. يمكنك تقليل شدة التمارين أو حجمها (deload) للحفاظ على النشاط مع السماح لجسمك بالراحة." };
            }
            
            let recommendation = '';
            if (index < 2) { 
                recommendation = "ركز على إتقان الأداء الحركي. حاول الحفاظ على أوزانك مع تحسين التحكم. ابدأ بـ 2-3 جلسات كارديو أسبوعيًا (20-30 دقيقة).";
            } else if (index < 4) {
                recommendation = "ابدأ بتطبيق الحمل التدريجي. استهدف زيادة الأوزان بنسبة 2-5% في تمارينك الأساسية، أو زيادة عدة (rep) واحدة. يمكنك زيادة مدة الكارديو بـ 5 دقائق.";
            } else {
                recommendation = "استمر في الحمل التدريجي. فكر في تجربة تقنيات متقدمة مثل (Drop Sets) أو زيادة كثافة الكارديو (HIIT) مرة أسبوعيًا للحفاظ على التقدم.";
            }
            return { ...phase, activityRecommendation: recommendation };
        });
    } else {
        // NEAT progression for non-athletes/general fitness
        return phases.map((phase, index) => {
             if (phase.type === PlanPhaseType.DIET_BREAK || phase.type === PlanPhaseType.HEALTH_FOCUS || phase.type === PlanPhaseType.MAINTENANCE) {
                return { ...phase, activityRecommendation: "حافظ على مستوى نشاطك الحالي. الهدف هو الراحة النفسية والجسدية، لذا استمتع بالحركة دون ضغط لزيادتها." };
            }
            
            let recommendation = '';
             if (index < 2) {
                recommendation = "الهدف هو بناء العادة. حاول المشي 15-20 دقيقة يوميًا وسجل متوسط خطواتك الأسبوعي.";
            } else if (index < 4) {
                recommendation = "استهدف زيادة متوسط خطواتك اليومية بمقدار 1000-1500 خطوة عن المتوسط السابق. كل خطوة تحدث فرقًا!";
            } else {
                recommendation = "تحدى نفسك بزيادة 500 خطوة إضافية يوميًا كل أسبوع، حتى تصل إلى هدف 8000-10000 خطوة يوميًا.";
            }
            return { ...phase, activityRecommendation: recommendation };
        });
    }
};


const createLoseWeightPhases = (
    userData: UserData,
    targetMacros: Macros,
    tdee: number
): { phases: PlanPhase[], estimatedDurationWeeks: number } => {
    
    let phases: PlanPhase[] = [];
    const mainPhaseMacros = { protein: targetMacros.protein, carbs: targetMacros.carbs, fat: targetMacros.fat };

    if (!userData.targetWeight || userData.targetWeight >= userData.weight) {
        const reviewInstruction = `بعد 4 أسابيع، قم بمراجعة تقدمك. إذا كان النزول أقل من المتوقع، فكر في تقليل السعرات اليومية بمقدار 100-250 سعرة، أو زيادة مستوى نشاطك.`;
        phases.push({
            type: PlanPhaseType.FAT_LOSS,
            name: "خسارة الدهون",
            duration: "مستمر",
            calories: targetMacros.calories,
            macros: mainPhaseMacros,
            notes: ["الالتزام بالعجز المحدد في السعرات.", "التركيز على تمارين المقاومة للحفاظ على العضلات."],
            reviewInstructions: reviewInstruction
        });
        return { phases, estimatedDurationWeeks: 0 };
    }
    
    const totalWeightToLoseKg = userData.weight - userData.targetWeight;
    const weeklyCalorieDeficit = (tdee - targetMacros.calories) * 7;
    const weeklyFatLossKg = weeklyCalorieDeficit / 7700;

    const initialWaterLossKg = Math.min(totalWeightToLoseKg, userData.weight * 0.025);
    const remainingFatToLoseKg = totalWeightToLoseKg - initialWaterLossKg;
    
    phases.push({
        type: PlanPhaseType.INITIAL_WATER_LOSS,
        name: "الأسبوع 1-2: نزول السوائل الأولي",
        duration: "أسبوعان",
        calories: targetMacros.calories,
        macros: mainPhaseMacros,
        notes: [
            `النزول المتوقع: ${initialWaterLossKg.toFixed(1)} - ${(initialWaterLossKg * 1.5).toFixed(1)} كجم (معظمه سوائل).`,
            "هذا النزول السريع طبيعي في بداية أي نظام غذائي نتيجة لتفريغ مخازن الجليكوجين."
        ]
    });
    
    let estimatedDurationWeeks = 2;
    let weekNumber = 3;

    if (remainingFatToLoseKg > 0 && weeklyFatLossKg > 0.1) {
        const weeksNeededForFatLoss = Math.ceil(remainingFatToLoseKg / weeklyFatLossKg);
        let weeksCounter = 0;
        let dietWeeksAccumulator = 0;

        while (weeksCounter < weeksNeededForFatLoss) {
            const remainingDietWeeks = weeksNeededForFatLoss - weeksCounter;
            
            if (dietWeeksAccumulator >= 8 && remainingDietWeeks > 2) {
                 phases.push({
                    type: PlanPhaseType.DIET_BREAK,
                    name: `الأسبوع ${weekNumber}: استراحة من الدايت (Diet Break)`,
                    duration: "أسبوع كامل",
                    calories: Math.round(tdee),
                    macros: { protein: userData.weight * 1.8, carbs: (tdee * 0.45) / 4, fat: (tdee * 0.30) / 9 },
                    notes: ["تناول سعرات الصيانة لمدة أسبوع كامل لتجديد النشاط وتقليل التوتر الهرموني.", "بعد الاستراحة، عد إلى خطة نقص السعرات."]
                });
                estimatedDurationWeeks += 1;
                weekNumber += 1;
                dietWeeksAccumulator = 0;
                continue;
            }
            
            const blockDuration = Math.min(remainingDietWeeks, 6);
            const isLastBlock = (weeksCounter + blockDuration) >= weeksNeededForFatLoss;
            const reviewInstruction = isLastBlock ? "لقد وصلت إلى نهاية خطتك المقترحة! قم بتقييم نتائجك وقرر ما إذا كنت تريد تحديد هدف جديد أو الانتقال إلى مرحلة الحفاظ على الوزن." : `بعد انتهاء هذه المرحلة، قم بمراجعة تقدمك. إذا كان النزول أبطأ من المتوقع، فكر في زيادة نشاطك اليومي أو تقليل 100-150 سعرة من الكربوهيدرات أو الدهون.`;
            
            phases.push({
                type: PlanPhaseType.FAT_LOSS,
                name: `الأسبوع ${weekNumber}-${weekNumber + blockDuration - 1}: خسارة الدهون المستمرة`,
                duration: `${blockDuration} ${blockDuration > 1 ? 'أسابيع' : 'أسبوع'}`,
                calories: targetMacros.calories,
                macros: mainPhaseMacros,
                weeklyLoss: `${weeklyFatLossKg.toFixed(2)} كجم/أسبوع`,
                notes: [`النزول المستمر والثابت من الدهون بمعدل 0.5-1% من وزن الجسم أسبوعيًا.`, `المجموع المتوقع خلال هذه المرحلة: ${(weeklyFatLossKg * blockDuration).toFixed(1)} كجم.`],
                reviewInstructions: reviewInstruction
            });
            weeksCounter += blockDuration;
            estimatedDurationWeeks += blockDuration;
            weekNumber += blockDuration;
            dietWeeksAccumulator += blockDuration;
            
            if (weeksCounter < weeksNeededForFatLoss && dietWeeksAccumulator >= 6) {
                 phases.push({
                    type: PlanPhaseType.REFEED_DAY,
                    name: `الأسبوع ${weekNumber}: يوم إعادة التغذية (Refeed)`,
                    duration: "يوم واحد ضمن هذا الأسبوع",
                    calories: Math.round(tdee),
                    macros: { 
                        protein: mainPhaseMacros.protein, 
                        carbs: mainPhaseMacros.carbs + 100,
                        fat: Math.max(20, (tdee - (mainPhaseMacros.protein * 4) - ((mainPhaseMacros.carbs + 100) * 4)) / 9)
                    },
                    notes: ["يوم واحد ترفع فيه الكربوهيدرات والسعرات إلى مستوى الصيانة.", "يساعد على إعادة شحن الجليكوجين وتنشيط هرمونات الحرق."]
                });
            }
        }
    }
    
    return { phases, estimatedDurationWeeks };
};

const createGainWeightPhases = (
    userData: UserData,
    targetMacros: Macros, // Main surplus macros
    tdee: number
): { phases: PlanPhase[], estimatedDurationWeeks: number } => {
    
    let phases: PlanPhase[] = [];

    // Phase 1: Adaptation (2 weeks)
    const adaptationCalories = tdee + 200;
    const adaptationMacros = {
        protein: targetMacros.protein,
        fat: Math.round((adaptationCalories * 0.25) / 9),
        carbs: Math.round((adaptationCalories - (targetMacros.protein * 4) - (adaptationCalories * 0.25)) / 4)
    };
    phases.push({
        type: PlanPhaseType.MUSCLE_GAIN,
        name: "الأسبوع 1-2: مرحلة التكيف",
        duration: "أسبوعان",
        calories: Math.round(adaptationCalories),
        macros: adaptationMacros,
        notes: [
            "الهدف هو تهيئة الجسم لزيادة السعرات تدريجيًا لتقليل اكتساب الدهون.",
            "ركز على إتقان الأداء الحركي في تمارينك وتأسيس روتين قوي."
        ]
    });

    // Phase 2: Lean Bulk (12 weeks)
    phases.push({
        type: PlanPhaseType.MUSCLE_GAIN,
        name: "الأسبوع 3-14: مرحلة البناء الصافي (Lean Bulk)",
        duration: "12 أسبوعًا",
        calories: targetMacros.calories,
        macros: targetMacros,
        notes: [
            `الهدف هو زيادة الوزن بمعدل 0.25-0.5% من وزنك أسبوعيًا (حوالي ${(userData.weight * 0.0025).toFixed(1)} إلى ${(userData.weight * 0.005).toFixed(1)} كجم).`,
            "التركيز الكلي على تطبيق الحمل التدريجي (زيادة الأوزان أو التكرارات) في تمارين المقاومة."
        ]
    });
    
    // Phase 3: Mini-Cut (4 weeks)
    const miniCutCalories = tdee * 0.75; // 25% deficit
    const miniCutMacros = {
        protein: Math.round(userData.weight * 2.2), // Higher protein to preserve muscle
        fat: Math.round((miniCutCalories * 0.25) / 9),
        carbs: Math.round((miniCutCalories - (userData.weight * 2.2 * 4) - (miniCutCalories * 0.25)) / 4)
    };
    phases.push({
        type: PlanPhaseType.MINI_CUT,
        name: "الأسبوع 15-18: مرحلة التنشيف السريع (Mini-Cut)",
        duration: "4 أسابيع",
        calories: Math.round(miniCutCalories),
        macros: miniCutMacros,
        notes: [
            "الهدف هو التخلص من بعض الدهون المتراكمة لتحسين حساسية الأنسولين والاستعداد لدورة بناء أخرى.",
            "هذه مرحلة قصيرة ومكثفة. توقع انخفاضًا في الأداء قليلاً."
        ]
    });
    
    // Phase 4: Maintenance (2 weeks)
    const maintenanceMacros = {
        protein: Math.round(userData.weight * 1.8),
        fat: Math.round((tdee * 0.30) / 9),
        carbs: Math.round((tdee - (userData.weight * 1.8 * 4) - (tdee * 0.30)) / 4)
    };
    phases.push({
        type: PlanPhaseType.MAINTENANCE,
        name: "الأسبوع 19-20: مرحلة الصيانة والتثبيت",
        duration: "أسبوعان",
        calories: Math.round(tdee),
        macros: maintenanceMacros,
        notes: [
            "تناول سعرات الصيانة لتثبيت النتائج، إراحة الجسم، وإعادة ضبط الهرمونات.",
            "هذه المرحلة تحضرك لبدء دورة بناء جديدة بنشاط وقابلية أفضل للنمو."
        ]
    });

    return { phases, estimatedDurationWeeks: 20 };
};


export const createAdvancedPlan = (userData: UserData, goalSettings: GoalSettings): AdvancedPlanResult => {
    const bmr = calculateBMR(userData);
    const tdee = calculateTDEE(bmr, userData.activityLevel);

    const specialCase = handleSpecialConsiderations(userData, bmr, tdee);
    if (specialCase.isOverridden && specialCase.plan) {
        const planWithRecs = { ...specialCase.plan, phases: addActivityRecommendations(specialCase.plan.phases, userData) };
        return planWithRecs;
    }
    
    let targetCalories: number;
    let warnings: string[] = [...specialCase.baseWarnings];
    let guidelines: string[] = [...specialCase.guidelines];
    
    let targetMacros: Macros;
    let proteinGrams, fatGrams, carbGrams;
    
    let phases: PlanPhase[] = [];
    let estimatedDuration = "N/A";
    let durationContext = ESTIMATED_DURATION_LABEL;
    
    if (goalSettings.goal === Goal.GAIN_WEIGHT) {
        const { gender, bodyFatPercentage } = userData;

        if (bodyFatPercentage === undefined || bodyFatPercentage <= 0) {
            guidelines.push(
                `### ملاحظة هامة حول نسبة الدهون`,
                `لم تقم بإدخال نسبة الدهون. للحصول على خطة زيادة وزن أكثر فعالية وأمانًا، نوصي بشدة بقياس نسبة دهونك. البدء بنسبة دهون مرتفعة قد يؤدي إلى اكتساب المزيد من الدهون بدلاً من العضلات.`
            );
        } else {
            const isMale = gender === Gender.MALE;

            if ((isMale && bodyFatPercentage > 20) || (!isMale && bodyFatPercentage > 28)) {
                warnings.push("تم تعديل هدفك تلقائيًا إلى خسارة الدهون أولاً.");
                guidelines.push(
                    `### 🎯 تغيير استراتيجي في الخطة`,
                    `لتحقيق أفضل النتائج في بناء العضلات على المدى الطويل، الخطوة الأولى والأهم هي خفض نسبة دهونك إلى نطاق صحي.`,
                    `لقد قمنا بتعديل خطتك للتركيز على خسارة الدهون أولاً بعجز سعرات حرارية معتدل.`,
                    `بمجرد وصولك إلى النطاق المثالي (أقل من 16% للرجال، 24% للنساء)، يمكنك البدء في مرحلة بناء العضلات بفعالية أكبر وجودة أعلى.`
                );

                const fatLossModifier = 0.20;
                let fatLossCalories = tdee * (1 - fatLossModifier);
                if (isMale && fatLossCalories < 1500) fatLossCalories = 1500;
                if (!isMale && fatLossCalories < 1200) fatLossCalories = 1200;
                if (fatLossCalories < bmr) fatLossCalories = bmr;

                proteinGrams = calculateProteinGrams(userData);
                fatGrams = userData.weight * 0.8;
                carbGrams = Math.max(0, (fatLossCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
                
                const fatLossMacros: Macros = { calories: Math.round(fatLossCalories), protein: Math.round(proteinGrams), carbs: Math.round(carbGrams), fat: Math.round(fatGrams) };
                const result = createLoseWeightPhases(userData, fatLossMacros, tdee);
                const finalPhases = addActivityRecommendations(result.phases, userData);

                return {
                    targetCalories: fatLossMacros.calories,
                    targetMacros: fatLossMacros,
                    estimatedDuration: result.estimatedDurationWeeks > 0 ? `${result.estimatedDurationWeeks} أسبوعًا` : "مستمر",
                    durationContext: `لخفض نسبة الدهون`,
                    phases: finalPhases,
                    warnings,
                    guidelines,
                    bmr: Math.round(bmr),
                    tdee: Math.round(tdee),
                    goal: Goal.LOSE_WEIGHT
                };
            }
            else if ((isMale && bodyFatPercentage > 16) || (!isMale && bodyFatPercentage > 24)) {
                warnings.push("تم تحويل خطتك إلى 'إعادة تشكيل الجسم' لتحقيق أفضل النتائج.");
                guidelines.push(
                    `### 💡 خطة إعادة تشكيل الجسم (Body Recomposition)`,
                    `نسبة دهونك الحالية مرتفعة قليلاً لبدء مرحلة بناء صافية. لذلك، تم ضبط سعراتك عند مستوى الصيانة (TDEE).`,
                    `الهدف الآن هو بناء العضلات وفقدان الدهون ببطء في نفس الوقت. قد لا ترى تغيرًا كبيرًا على الميزان، لكن شكل جسمك سيتحسن.`,
                    `**الأهم:** التركيز المطلق على تمارين المقاومة وزيادة قوتك هو مفتاح النجاح في هذه المرحلة.`
                );

                const recompCalories = tdee;
                proteinGrams = calculateProteinGrams(userData);
                fatGrams = (recompCalories * 0.3) / 9;
                carbGrams = Math.max(0, (recompCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
                
                const recompMacros: Macros = { calories: Math.round(recompCalories), protein: Math.round(proteinGrams), carbs: Math.round(carbGrams), fat: Math.round(fatGrams) };

                const recompPhases: PlanPhase[] = [{
                    type: PlanPhaseType.MAINTENANCE,
                    name: "مرحلة إعادة تشكيل الجسم",
                    duration: "4-8 أسابيع",
                    calories: recompMacros.calories,
                    macros: recompMacros,
                    notes: [ "تناول سعرات الصيانة.", "التركيز على زيادة الأداء في تمارين المقاومة.", "مراقبة قياسات الجسم (الخصر) وصور التقدم، فهي أهم من الميزان." ],
                    reviewInstructions: "بعد 4-8 أسابيع، قم بإعادة تقييم نسبة دهونك. إذا انخفضت إلى النطاق المثالي، يمكنك الانتقال إلى مرحلة البناء الصافي."
                }];

                return {
                    targetCalories: recompMacros.calories,
                    targetMacros: recompMacros,
                    estimatedDuration: "4-8 أسابيع",
                    durationContext: "مرحلة أولية",
                    phases: addActivityRecommendations(recompPhases, userData),
                    warnings,
                    guidelines,
                    bmr: Math.round(bmr),
                    tdee: Math.round(tdee),
                    goal: Goal.MAINTAIN_WEIGHT
                };
            }
        }
    }
    
    switch (goalSettings.goal) {
        case Goal.LOSE_WEIGHT:
            targetCalories = tdee * (1 - goalSettings.modifier);
            break;
        case Goal.GAIN_WEIGHT:
             const surplus = tdee * (1 + goalSettings.modifier);
             targetCalories = surplus;
             break;
        case Goal.MINI_CUT:
            targetCalories = tdee * (1 - goalSettings.modifier);
            break;
        default:
             targetCalories = tdee;
             break;
    }
    
    if (userData.gender === Gender.FEMALE && targetCalories < 1200) {
        targetCalories = 1200;
        warnings.push("تم رفع السعرات إلى 1200 وهو الحد الأدنى الآمن للنساء.");
    }
    if (userData.gender === Gender.MALE && targetCalories < 1500) {
        targetCalories = 1500;
        warnings.push("تم رفع السعرات إلى 1500 وهو الحد الأدنى الآمن للرجال.");
    }
    if (targetCalories < bmr) {
        targetCalories = bmr;
        warnings.push("تم رفع السعرات لتساوي معدل الأيض الأساسي (BMR) للحفاظ على وظائف الجسم الحيوية.");
    }
    
    if (goalSettings.goal === Goal.MAINTAIN_WEIGHT) {
        proteinGrams = calculateProteinGrams(userData);
        fatGrams = (targetCalories * 0.3) / 9; // 30% fat for maintenance
        const proteinCalories = proteinGrams * 4;
        const fatCalories = fatGrams * 9;
        carbGrams = Math.max(0, (targetCalories - proteinCalories - fatCalories) / 4);
    } else {
        if (goalSettings.goal === Goal.MINI_CUT) {
            proteinGrams = userData.weight * 2.5;
        } else {
            proteinGrams = calculateProteinGrams(userData);
        }
        fatGrams = userData.weight * 0.8;
        carbGrams = Math.max(0, (targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
    }
    
    targetMacros = {
        calories: Math.round(targetCalories),
        protein: Math.round(proteinGrams),
        carbs: Math.round(carbGrams),
        fat: Math.round(fatGrams),
    };

    if (goalSettings.goal === Goal.LOSE_WEIGHT) {
        const result = createLoseWeightPhases(userData, targetMacros, tdee);
        phases = result.phases;
        if (userData.targetWeight && result.estimatedDurationWeeks > 0) {
            estimatedDuration = `${result.estimatedDurationWeeks} أسبوعًا`;
            durationContext = `للوصول إلى ${userData.targetWeight} كجم`;
        } else {
            estimatedDuration = "مستمر";
        }
    } else if (goalSettings.goal === Goal.GAIN_WEIGHT) {
        const result = createGainWeightPhases(userData, targetMacros, tdee);
        phases = result.phases;
        if (userData.targetWeight && userData.targetWeight > userData.weight) {
            const weightToGainKg = userData.targetWeight - userData.weight;
            const weeklyGainKg = userData.weight * 0.00375; // Avg 0.375% weekly gain
            const bulkWeeksPerCycle = 12;
            const cycleDurationWeeks = 20;

            if (weeklyGainKg > 0) {
                const totalBulkWeeksNeeded = weightToGainKg / weeklyGainKg;
                const totalCyclesNeeded = totalBulkWeeksNeeded / bulkWeeksPerCycle;
                const totalWeeks = Math.ceil(totalCyclesNeeded * cycleDurationWeeks);
                estimatedDuration = `~${totalWeeks} أسبوعًا`;
            } else {
                estimatedDuration = "غير محدد";
            }
            durationContext = `للوصول إلى ${userData.targetWeight} كجم`;
        } else {
            estimatedDuration = `دورة بناء واحدة (${result.estimatedDurationWeeks} أسبوعًا)`;
            durationContext = "مدة دورة البناء";
        }
         guidelines.push(
            `### فهم خطة زيادة الوزن طويلة المدى`,
            `خطة الـ ${result.estimatedDurationWeeks} أسبوعًا المعروضة تمثل **دورة بناء عضلي متكاملة واحدة**. للوصول إلى هدفك النهائي، ستحتاج إلى **تكرار هذه الدورة**.`,
            `بعد كل دورة، قم بتقييم نتائجك، استرح لمدة أسبوع على سعرات الصيانة، ثم ابدأ دورة جديدة بوزن بداية أعلى.`
        );
    }
    else {
        switch (goalSettings.goal) {
            case Goal.MINI_CUT:
                phases.push({ type: PlanPhaseType.MINI_CUT, name: "مرحلة التنشيف السريع", duration: "3-4 أسابيع فقط", calories: targetMacros.calories, macros: targetMacros, notes: ["عجز كبير في السعرات مع بروتين عالي."], reviewInstructions: "بعد انتهاء هذه المرحلة، انتقل إلى مرحلة صيانة لمدة أسبوع على الأقل قبل العودة إلى البناء." });
                estimatedDuration = "3-4 أسابيع";
                break;
            default: // MAINTAIN
                phases.push({ type: PlanPhaseType.MAINTENANCE, name: "الحفاظ على الوزن", duration: "مستمر", calories: targetMacros.calories, macros: targetMacros, notes: ["تناول سعرات الصيانة للحفاظ على نتائجك."] });
                estimatedDuration = "مستمر";
                break;
        }
    }
    
    const finalPhases = addActivityRecommendations(phases, userData);

    return {
        targetCalories: targetMacros.calories,
        targetMacros,
        estimatedDuration,
        durationContext,
        phases: finalPhases,
        warnings,
        guidelines: guidelines.length > 0 ? guidelines : undefined,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goal: goalSettings.goal
    };
};
