/**
 * Send message to get cookies from VKU for call ajax request
 */
async function getHeadersCookies(cookiesArray) {
    let cookies = "";
    for (const i in cookiesArray) {
        cookies += `${cookiesArray[i].name}=${cookiesArray[i].value}; `;
    }
    return cookies;
}


function detectStatus(subjectsStep1, subjectsStep2) {
    // console.log("detectStatus_runner"); // Debug only
    $('.text-status-log').on('change', function () {
        var typeStep = $('.type-step').val();
        if (typeStep == 1) {
            countS1++;
            if (countS1 == subjectsStep1.length && typeStep == 1) {
                $(".text-status-alert").css("color", "green");
                $('.text-status-alert').text('Đã đánh giá xong bước 1');
                $('.btn-reload').show();
            }
        }
        if (typeStep == 2) {
            countS2++;
            if (countS2 == subjectsStep2.length && typeStep == 2) {
                $(".text-status-alert").css("color", "green");
                $('.text-status-alert').text('Đã đánh giá xong bước 2');
                $('.btn-reload').show();
            }
        }
    });
}