(function ($) {
    var stepsWithoutNext = [0];
    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            gender: {
                required: true,
            },
            nationality: {
                required: true,
            },
            age: {
                required: true,
                min: 18,
                max: 65,
            },
            height: {
                required: true,
                min: 121,
                max: 200,
            },
            weight: {
                required: true,
                min: 40,
                max: 350,
            },
            fleshcolour: {
                required: true,
            },
            jobStatus: {
                required: true,
            },
            commitment: {
                required: true,
            },
            tribe: {
                required: true,
            },
            smoking: {
                required: true,
            },
            ///// soicalStatus
            region: {
                required: true,
            },
            qualification: {
                required: true,
            },
            originArea: {
                required: true,
            },
            //// LegalView
            marriageType: {
                required: true,
            },
            /// AcceptOtherNationality
            /// TalkAboutYourSelf
        },
        messages: {
            gender: {
                required: "من فضلك اختار النوع",
            },
            nationality: {
                required: "من فضلك اختار الجنسية",
            },
            age: {
                required: "من فضلك قم بتحديد العمر بشكل صحيح",
                min: "من فضلك قم بتحديد العمر بشكل صحيح",
                max: "من فضلك قم بتحديد العمر بشكل صحيح",
            },
            height: {
                required: "من فضلك قم بتحديد العمر بشكل صحيح",
                min: "من فضلك قم بتحديد الطول بشكل صحيح",
                max: "من فضلك قم بتحديد الطول بشكل صحيح",
            },
            weight: {
                required: "من فضلك قم بتحديد الوزن بشكل صحيح",
                min: "من فضلك قم بتحديد الوزن بشكل صحيح",
                max: "من فضلك قم بتحديد الوزن بشكل صحيح",
            },
            fleshcolour: {
                required: "من فضلك اختار لون البشرة ",
            },
            jobStatus: {
                required: "من فضلك اختار نوع الوظيفة",
            },
            commitment: {
                required: "من فضلك اختار نوع الوظيفة",
            },
            tribe: {
                required: "من فضلك قم بالاختيار",
            },
            smoking: {
                required: "من فضلك قم بالاختيار",
            },
            region: {
                required: " من فضلك اختار المنطقة ",
            },
            qualification: {
                required: " من فضلك اختار المؤهل ",
            },
            originArea: {
                required: "من فضلك اختار منطقة الاصل",
            },
            marriageType: {
                required: "من فضلك اختار نوع الزواج",
            }
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        highlight: function (element, errorClass, validClass) {
            $(element.form).find('.actions').addClass('form-error');
            $(element).removeClass('valid');
            $(element).addClass('error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element.form).find('.actions').removeClass('form-error');
            $(element).removeClass('error');
            $(element).addClass('valid');
        }
    });
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        labels: {
            previous: 'السابق',
            next: 'التالي',
            finish: 'حفظ وارسال',
            current: ''
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setProgerssBar(currentIndex);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) {
                toggleNextButtonForStepper($("#signup-form").steps('getStep', newIndex).content.includes(`type="radio"`));
                return true;
            }

            if (form.valid()) {
                toggleNextButtonForStepper($("#signup-form").steps('getStep', newIndex).content.includes(`type="radio"`));
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            }

        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            radioValue = $("input[name='smoking']:checked").val();
            alert("Your are a - " + radioValue);
        },
        onInit: function (event, currentIndex) {
            // console.log(event)
            // $("#signup-form > fieldset").get()
            toggleNextButtonForStepper($("#signup-form").steps('getStep', currentIndex).content.includes(`type="radio"`));
            setProgerssBar(currentIndex);
        }
    });
    function toggleNextButtonForStepper(display) {
        // if ($.inArray(index, stepsWithoutNext) !== -1) {
        //     $("[href*='next']").toggle(false)
        // } else {
        //     $("[href*='next']").toggle(true)
        // }
        $("[href*='next']").toggle(!display)

    }
    function setProgerssBar(index) {
        percentag = (((index + 1) / $("#signup-form  fieldset").get().length) * 100).toFixed();
        // console.log(percentag)  
        $("#progress").attr("aria-valuenow", percentag);
        $("#progress").css("width", percentag +"%");
    }

})(jQuery);

$("input[type='radio'][name!='smoking']").click(function (element) {
    $("[href*='next']").click()
});

// adjusting smoking-step
localStorage.setItem('smoking-step', JSON.stringify($("#signup-form").steps("getStep", 9)));
$("input[type='radio'][name='smoking']").click(function (element) {
    $("[href*='next']").click()
});
$(".male").show();
$(".female").hide()
$('input[type=radio][name="gender"]').change(function () {
    // if female
    if (this.value == "0") {
        $("input[type='radio'][name='smoking']").unbind();
        $("#signup-form").steps("remove", 9)
        $(".female").show();
        $(".male").hide();
    } else {
        $("#signup-form").steps("insert", 9, JSON.parse(localStorage.getItem('smoking-step')));
        $("input[type='radio'][name='smoking']").click(function (element) {
            $("[href*='next']").click()
        });
        $(".male").show();
        $(".female").hide()
    }
});
