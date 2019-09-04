(function() {
    var aa = new LazyForm();
    aa.add(new LazyForm.header())
      .add(new LazyForm.sidebar())
      .add(new LazyForm.content())
      .render();
})();