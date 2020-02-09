$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__center__a">
          <p class="chat-main__center__a__name">
            ${message.user_name}
          </p>
          <p class="chat-main__center__a__day">
            ${message.created_at}
          </p>
        </div>
        <div class="chat-main__center__kiji">
          <p class="chat-main__center__kiji__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} "class=input-box__image" >
      </div>`
    } else if (message.content) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__center__a">
          <p class="chat-main__center__a__name">
            ${message.user_name}
          </p>
          <p class="chat-main__center__a__day">
            ${message.created_at}
          </p>
        </div>
        <div class="chat-main__center__kiji">
          <p class="chat-main__center__kiji__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__center__a">
          <p class="chat-main__center__a__name">
            ${message.user_name}
          </p>
          <p class="chat-main__center__a__day">
            ${message.created_at}
          </p>
        </div>
        <img src=${message.image} "class=input-box__image" >
      </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__center').append(html);      
      $('form')[0].reset();
      $('.chat-main__center').animate({ scrollTop: $('.chat-main__center')[0].scrollHeight});
      $('.submit-btn').attr('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__center').append(insertHTML);
        $('.chat-main__center').animate({ scrollTop: $('.chat-main__center')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});