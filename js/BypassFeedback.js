const step1SubmitFeedbackUrl = "http://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/";
const step2SubmitFeedbackUrl = "http://daotao.vku.udn.vn/sv/cap-nhat-khao-sat-hoc-phan?hocphan_id=";
// http://daotao.vku.udn.vn/sv/cap-nhat-khao-sat-hoc-phan?hocphan_id=6&value=1
var countS1 = 0;
var countS2 = 0;

async function bypassFeedbackStepOne(cookiesArray, subjectsStep1) {
    const cookies = await getHeadersCookies(cookiesArray); //Call from helpers

    await subjectsStep1.forEach(async (element) => {
        $('.form-step-1').show();
        const subject = element.split('|');
        await executeAjaxToStepOne(cookies, subject[1], subject[0])

    });
}

async function bypassFeedbackStepTwo(cookiesArray, subjectsStep2) {
    const cookies = await getHeadersCookies(cookiesArray); //Call from helpers
    await subjectsStep2.forEach(async (element) => {
        $('.form-step-1').show();
        const subject = element.split('|');
        console.log(subject);
        await executeAjaxToStepTwo(cookies, subject[1], subject[0])
    });

}

async function executeAjaxToStepOne(headers, idClass, subjectName) {
    var csrf = $('meta[name=csrf-token]').attr('content');

    var data = new FormData();
    data.append("_token", csrf);
    data.append("traloi[2][]", 5);
    data.append("traloi[3][]", 5);
    data.append("traloi[4][]", 5);
    data.append("traloi[5][]", 5);
    data.append("traloi[7][]", 5);
    data.append("traloi[8][]", 5);
    data.append("traloi[3][]", 5);
    data.append("traloi[3][]", 5);
    data.append("traloi[3][]", 5);
    data.append("traloi[5][]", 5);
    data.append("traloi[7][]", 5);
    data.append("traloi[8][]", 5);
    data.append('traloi[9][]', 5);
    data.append('traloi[10][]', 5);
    data.append('traloi[11][]', 5);
    data.append('traloi[12][]', 5);
    data.append('traloi[13][]', 5);
    data.append('traloi[14][]', 5);
    data.append('traloi[15][]', 5);
    data.append('traloi[16][]', 5);
    data.append('traloi[17][]', 5);
    data.append('traloi[19][]', 5);
    data.append('traloi[20][]', 5);
    data.append('traloi[22][]', 5);
    data.append('traloi[23][]', 5);
    data.append('traloi[24][]', 5);
    data.append('traloi[25][]', 5);
    data.append('traloi[26][]', 5);
    data.append('traloi[27][]', 5);
    data.append('traloi[28][]', 5);
    data.append('traloi[29][]', 5);
    data.append('traloi[30][]', 5);
    data.append('traloi[31][]', 5);
    data.append('tuluan[]', ' ');
    data.append('tuluan[]', ' ');
    data.append('tuluan[]', ' ');
    data.append('tuluan[]', ' ');
    data.append('idlop', idClass);
    
    $.ajax({
        url: step1SubmitFeedbackUrl + idClass,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            headers,
        },
        type: 'POST',
        processData: false,
        contentType: false,
        data: data,
        success: function (data, textStatus, jQxhr) {
            console.log(jQxhr.status);
            if (jQxhr.status == 200) {
                console.log("fetched successfully");
                $('.text-status-log').val(`${oldText}${subjectName} - [Đã đánh giá xong ✓] \n`).change();
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            $('.text-status-log').val(`${oldText}${subjectName} - [Dánh giá thất bại x] \n`).change();
        }
    });
}

async function executeAjaxToStepTwo(headers, idClass, subjectName) {
    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    console.log("url=" + step2SubmitFeedbackUrl + idClass + '&value=1');

    $.ajax({
        url: step2SubmitFeedbackUrl + idClass + '&value=1',
        headers: {
            headers,
        },
        type: 'GET',
        success: function (data, textStatus, jQxhr) {
            console.log(jQxhr.status);
            if (jQxhr.status == 200) {
                console.log("fetched successfully");
                var oldText = $('.text-status-log').val();
                $('.text-status-log').val(`${oldText}${subjectName} - [Đã đánh giá xong ✓] \n`).change();
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            $('.text-status-log').val(`${oldText}${subjectName} - [Dánh giá thất bại x] \n`).change();

        }
    });
}