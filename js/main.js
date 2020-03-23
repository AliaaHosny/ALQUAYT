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
            Height: {
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
            JobStatus: {
                required: true,
            },
            commitment: {
                required: true,
            },
            Tribe: {
                required: true,
            },
            smoking: {
                required: true,
            },
            Region: {
                required: true,
            },
            Qualification: {
                required: true,
            },
            Originarea: {
                required: true,
            },
            marriagetype: {
                required: true,
            },
            status: {
                required: true,
                number: true,
            },
            cvc: {
                required: true,
            },
        },
        messages: {
            gender: {
                required: "من فضلك اختار النوع",

            },
            nationality: {
                required: "من فضلك اختار الجنسية",
            },
            age: {
                required: "من فضلك اكتب العمر   ",
                min: "من فضلك اكتب العمر صحيح ",
                max: "من فضلك اكتب العمر صحيح ",
            },
            Height: {
                required: "من فضلك اكتب الطول   ",
                min: "من فضلك اكتب الطول صحيح ",
                max: "من فضلك اكتب الطول صحيح ",
            },
            weight: {
                required: "من فضلك اكتب الوزن   ",
                min: "من فضلك اكتب الوزن صحيح ",
                max: "من فضلك اكتب الوزن صحيح ",
            },
            fleshcolour: {
                required: "من فضلك اكتب لون البشرة   ",

            }
            , JobStatus: {
                required: true,
            },
            commitment: {
                required: true,
            },
            Tribe: {
                required: true,
            },
            smoking: {
                required: true,
            },
            Region: {
                required: true,
            },
            Qualification: {
                required: true,
            },
            Originarea: {
                required: true,
            },
            marriagetype: {
                required: true,
            },
            status: {
                required: true,
                number: true,
            },






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
        $("#progress").css("width", percentag);
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
