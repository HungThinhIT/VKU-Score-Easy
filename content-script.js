$(document).ready(async function () {
    console.log("VKU Easy Score extension is ready!");

    //Initial variables
    const step1UrlFilterPrefix = 'http://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/';
    const step2UrlFilterPrefix = 'http://daotao.vku.udn.vn/sv/khao-sat-hoc-phan?id=';
    const step1SubmitFeedbackUrl = "http://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/";
    const step2SubmitFeedbackUrl = "TODO";
    var subjectsStep1 = [];
    var subjectsStep2 = [];
    var subjectsDone = [];

    let rawBody = `
    <div class="col-md-12 col-sm-12 col-xs-12">'
        <div class="x_panel">
            <div class="x_title">
                <h2>VKU Score Easy Panel Unofficial (Use at your own risk)</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <p></p>
                <div class="row">
                    <div class="col-md-8 col-sm-12 col-xs-12">
                        <div> Thông tin đánh giá</div>
                        <ul>
                            <li>Môn đã hoàn thành đánh giá: <b><span class="phoenix_subjects_done_count">0</span></b> môn</li>
                            <li>Môn chưa đánh giá bước 1:  <b><span class="phoenix_subjects_step1_count">0</span></b> môn (Đánh giá lớp học phần)</li>
                            <li>Môn chưa đánh giá bước 2:  <b><span class="phoenix_subjects_step2_count">0</span></b> môn (Đánh giá sự cần thiết của học phần)</li>
                        </ul>
                        <div class="btn-group">
                            <button id="phoenix_feedbackStep1" class="btn btn-primary">Đánh giá nhanh bước 1 </button>
                            <button id="phoenix_feedbackStep2" class="btn btn-success">Đánh giá nhanh bước 2 </button>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12 col-xs-12">
                        Right columns;
                    </div>
                </div>
               
            </div>
        </div>
    </div>`;

    function initialPanel() {
        window.location.href == 'http://daotao.vku.udn.vn/sv/diem'
            ? $("body > div > div > div.right_col > div > div.row").prepend(rawBody) : '';
    }

    /**
     * Call handler
     */
    initialPanel();
    initialData();
    initBypassStepButton(); //init bypass button

    /**
     * Callback handle bypass feed back step 1 & step 2
     * @Phoenix 2021 - Nguyen Hung Thinh
     */
    function initBypassStepButton() {
        $("#phoenix_feedbackStep1").click(function () {
            console.log("clicked");
            chrome.runtime.sendMessage({ phoenix: "nguyenhungthinh_17it2" }, async function (response) {
                const cookies = getHeadersCookies(await response.cookies);
            });
        });

        $("#phoenix_feedbackStep2").click(function () {
            //TODO:
        });
    }

    function filterIdHref(url, typeStep) {
        if (typeStep == 1) return url.substring(step1UrlFilterPrefix.length);
        return url.substring(step2UrlFilterPrefix.length);
    }

    function reloadCountData() {
        $('.phoenix_subjects_done_count').text(subjectsDone.length);
        $('.phoenix_subjects_step1_count').text(subjectsStep1.length);
        $('.phoenix_subjects_step2_count').text(subjectsStep2.length + subjectsStep1.length);
        const isExistClassId = false;
        chrome.storage.sync.get(['class_id'], function(result) {
            console.log(result);
            console.log(result.class_id === undefined);
        });
        subjectsStep2.length == 0 ? $('#phoenix_feedbackStep2').hide() : $('#phoenix_feedbackStep2').show();
    }

    /**
     * Initial data from table html.
     */
    function initialData() {
        $('body > div > div > div.right_col > div > div > div:nth-child(3) > div > div.x_content > div > table').find('tr').each(function (i, el) {
            var $tds = $(this).find('td'),
                subjectName = $tds.eq(1).text(),
                actionButtonText = $tds.eq(11).text(),
                actionButtonHref = $tds.eq(11).find('a').attr('href');
            if (subjectName.length > 0) {
                if (actionButtonText.length > 0) {
                    switch (actionButtonText) {
                        case 'Đánh giá lớp học phần':
                            return subjectsStep1.push(`${subjectName}|${filterIdHref(actionButtonHref, 1)}`);
                        case 'Đánh giá sự cần thiết của Học phần':
                            return subjectsStep2.push(`${subjectName}|${filterIdHref(actionButtonHref, 2)}`);
                    }
                }
                return subjectsDone.push(subjectName);
            }
            // do something with in for loop
        });
        reloadCountData();
    }

    /**
     * Send message to get cookies from VKU for call ajax request
     */
    function getHeadersCookies(cookiesArray) {
        let cookies = "";
        for (const i in cookiesArray) {
            cookies += `${cookiesArray[i].name}=${cookiesArray[i].value};`;
        }
    }

    async function bypassFeedbackStepOne(headers) {

        var data = new FormData();
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
        data.append('tuluan[]', ' ');
        data.append('idlop', ' ');
        $.ajax({
            url: step1SubmitFeedbackUrl,
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function (data, textStatus, jQxhr) {
                // $('#response pre').html(  );
                console.log(JSON.stringify(data));
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    


    /*
    sample storage extension

    chrome.storage.sync.set({key: value}, function() {
        console.log('Value is set to ' + value);
      });
      
      chrome.storage.sync.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
      });
      */
});
