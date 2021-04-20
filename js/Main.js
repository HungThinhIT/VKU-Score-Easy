$(document).ready(async function () {
    console.log("VKU Easy Score extension is ready!");

    $('head').contents()
        .filter(function () {
            return this.nodeType === 8 && this.textContent.includes('<meta name="csrf-token"')
        }).replaceWith(function(){return this.data;})

    // var csrf = $('meta[name=csrf-token]').attr('content');
    // console.log(c);
    //Initial variables
    const step1UrlFilterPrefix = 'http://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/';
    const step2UrlFilterPrefix = '/sv/khao-sat-hoc-phan?id=';
    var subjectsStep1 = [];
    var subjectsStep2 = [];
    var subjectsDone = [];

    let rawBody = `
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>VKU Score Easy Panel (Use at your own risk) v1.0</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <p></p>
                <div class="row">
                    <div class="col-md-7 col-sm-12 col-xs-12">
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
                    <div class="col-md-5 col-sm-12 col-xs-12">
                        <div class="form-step-1">
                            <span>Các môn đánh giá tự động</span>
                            <p>Trạng thái: <span class="text-status-alert"></span></p> <button class="btn btn-success btn-reload">Tải lại trang</button>
                            <input hidden class="type-step" value="">
                            <textarea rows="5" readonly="true" class="form-control text-status-log"></textarea>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>`;

    function initialPanel() {
        window.location.href == 'http://daotao.vku.udn.vn/sv/diem'
            ? $("body > div > div > div.right_col > div > div.row").prepend(rawBody) : '';
        $('.form-step-1').hide();
    }

    /**
     * Call handler
     */
    initialPanel();
    initialData();
    detectStatus(subjectsStep1, subjectsStep2);
    initBypassStepButton(); //init bypass button

    /**
     * Callback handle bypass feed back step 1 & step 2
     * @Phoenix 2021 - Nguyen Hung Thinh
     */
    function initBypassStepButton() {
        $("#phoenix_feedbackStep1").click(function () {
            countS1 = 0;
            $('.text-status-log').val('');
            $(".text-status-alert").css("color", "orange");
            $('.text-status-alert').text('Đang đánh giá tự động...');
            $('.btn-reload').hide();
            $('.type-step').val(1);
            chrome.runtime.sendMessage({ phoenix: "nguyenhungthinh_17it2" }, async function (response) {
                await bypassFeedbackStepOne(await response.cookies, subjectsStep1);
            });
        });
        
        $("#phoenix_feedbackStep2").click(function () {
            countS2 = 0;
            $('.text-status-log').val('');
            $(".text-status-alert").css("color", "orange");
            $('.text-status-alert').text('Đang đánh giá tự động...');
            $('.btn-reload').hide();
            $('.type-step').val(2);
            chrome.runtime.sendMessage({ phoenix: "nguyenhungthinh_17it2" }, async function (response) {
                await bypassFeedbackStepTwo(await response.cookies, subjectsStep2);
            });
        });

        $(".btn-reload").click(function () { //Reload button
            location.reload();
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

        subjectsStep1.length == 0 ? $('#phoenix_feedbackStep1').hide() : '';
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
                            console.log(actionButtonHref);
                            return subjectsStep2.push(`${subjectName}|${filterIdHref(actionButtonHref, 2)}`);
                    }
                }
                return subjectsDone.push(subjectName);
            }
            // do something with in for loop
        });
        reloadCountData();
    }

});
