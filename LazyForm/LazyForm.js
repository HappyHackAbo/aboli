(function() {
    var sidebarList = [
        {
            id: 0,
            name: '拾色器',
            icon: 'colorPicker'
        },
        {
            id: 1,
            name: '日期',
            icon: 'datePicker'
        }
    ];
    var headerList = [
        {
            id: 0,
            name: '新建表单',
            icon: 'add-form'
        }
    ];
    var contentList = [
        {
            id: 0,
            name: '新建表单1'
        }
    ];
    var __sidebar = new LazyForm.sidebar(sidebarList);
    var __header = new LazyForm.header(headerList);
    var __content = new LazyForm.content(contentList);
    var aa = new LazyForm({
        className: 'home'
    });
    aa.add(__header)
      .add(__sidebar)
      .add(__content)
      .render();
})();