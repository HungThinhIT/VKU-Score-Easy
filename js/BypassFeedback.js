const step1SubmitFeedbackUrl = "http://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/";
const step2SubmitFeedbackUrl = "http://daotao.vku.udn.vn/sv/cap-nhat-khao-sat-hoc-phan?hocphan_id=";
// http://daotao.vku.udn.vn/sv/cap-nhat-khao-sat-hoc-phan?hocphan_id=6&value=1
var countS1 = 0;
var countS2 = 0;

async function bypassFeedbackStepOne(cookiesArray, subjectsStep1) {
    const cookies = await getHeadersCookies(cookiesArray); //Call from helpers
    var looper = $.Deferred().resolve();
    $.when.apply($, $.map(subjectsStep1, function (item, i) {
        looper = looper.then(function () {
            $('.form-step-1').show();
            const subject = item.split('|');
            // console.log(subject); // Debug only
            return executeAjaxToStepOne(cookies, subject[1], subject[0]);
        });
        return looper;
    })).then(function () {
        console.log('STEP 1: Done');
    });
}

async function bypassFeedbackStepTwo(cookiesArray, subjectsStep2) {
    const cookies = await getHeadersCookies(cookiesArray); //Call from helpers
    var looper = $.Deferred().resolve();
    $.when.apply($, $.map(subjectsStep2, function (item, i) {
        looper = looper.then(function () {
            $('.form-step-1').show();
            const subject = item.split('|');
            // console.log(subject); // Debug only
            return executeAjaxToStepTwo(cookies, subject[1], subject[0]);
        });
        return looper;
    })).then(function () {
        console.log('STEP 2: Done');
    });

}

function executeAjaxToStepOne(headers, idClass, subjectName) {
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
                console.log(`Đánh giá thành công môn ${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')}`);
                deferred.resolve();
                var oldText = $('.text-status-log').val();
                $('.text-status-log').val(`${oldText}${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')} - [Đã đánh giá xong ✓] \n`).change();
                $('.text-status-log').blur();
                $('.text-status-log').focus();
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(`Đã có lỗi trong quá trình đánh giá môn ${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')}`);
            deferred.reject();
            var oldText = $('.text-status-log').val();
            $('.text-status-log').val(`${oldText}${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')} - [Đánh giá thất bại x] \n`).change();
        }
    });
}


function executeAjaxToStepTwo(headers, idClass, subjectName) {
    // console.log("URI=" + step2SubmitFeedbackUrl + idClass + '&value=2'); // Debug only
    var deferred = $.Deferred();

    $.ajax({
        url: step2SubmitFeedbackUrl + idClass + '&value=2',
        headers: {
            headers,
        },
        type: 'GET',
        success: function (data, textStatus, jQxhr) {
            console.log(jQxhr.status);
            if (jQxhr.status == 200) {
                console.log(`Đánh giá thành công môn ${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')}`);
                deferred.resolve();
                var oldText = $('.text-status-log').val();
                $('.text-status-log').val(`${oldText}${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')} - [Đã đánh giá xong ✓] \n`).change();
                $('.text-status-log').blur();
                $('.text-status-log').focus();
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(`Đã có lỗi trong quá trình đánh giá môn ${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')}`);
            deferred.reject();
            var oldText = $('.text-status-log').val();
            $('.text-status-log').val(`${oldText}${subjectName.replace(/(\r\n|\n|\r|\t)/gm,'')} - [Đánh giá thất bại x] \n`).change();

        }
    });
    return deferred.promise();
}