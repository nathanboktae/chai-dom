describe('DOM assertions', function() {
  var inspect,
      tempEl = document.createElement('div'),
      parse = function(str) {
        tempEl.innerHTML = str
        return tempEl.children[0]
      }

  chai.use(function(chai, utils) {
    inspect = utils.objDisplay

    chai.Assertion.addMethod('fail', function(message) {
      var obj = utils.flag(this, 'object')

      new chai.Assertion(obj).is.a('function')

      try {
        obj()
      } catch (err) {
        this.assert(
          err instanceof chai.AssertionError
          , 'expected #{this} to fail, but it threw ' + inspect(err))
        this.assert(
          err.message === message
          , 'expected #{this} to fail with ' + inspect(message) + ', but got ' + inspect(err.message))
        return
      }

      this.assert(false, 'expected #{this} to fail')
    })
  })

  describe('attr', function() {
    var subject = parse('<div name="foo"></div>')

    describe('when only attribute name is provided', function() {
      it('passes when the element has the attribute', function() {
        subject.should.have.attr('name')
      })

      it('passes negated when the element does not have the attribute', function() {
        subject.should.not.have.attr('bar')
      })

      it('fails when the element does not have the attribute', function() {
        (function() {
          subject.should.have.attr('bar')
        }).should.fail('expected div[name="foo"] to have an attribute \'bar\'')
      })

      it('fails negated when the element has the attribute', function() {
        (function() {
          subject.should.not.have.attr('name')
        }).should.fail('expected div[name="foo"] not to have an attribute \'name\'')
      })
    })

    describe('when attribute name and value are provided', function() {
      it('passes when the element has the attribute with the given value', function() {
        subject.should.have.attr('name', 'foo')
      })

      it('passes negated when the element does not have the attribute', function() {
        subject.should.not.have.attr('bar', 'foo')
      })

      it('passes negated when the element has the attribute with a different value', function() {
        subject.should.not.have.attr('name', 'bar')
      })

      it('fails when the element does not have the attribute', function() {
        (function() {
          subject.should.have.attr('bar', 'foo')
        }).should.fail('expected div[name="foo"] to have an attribute \'bar\'')
      })

      it('fails when the element has the attribute with a different value', function() {
        (function() {
          subject.should.have.attr('name', 'bar')
        }).should.fail('expected div[name="foo"] to have an attribute \'name\' with the value \'bar\', but the value was \'foo\'')
      })

      it('fails negated when the element has the attribute with the given value', function() {
        (function() {
          subject.should.not.have.attr('name', 'foo')
        }).should.fail('expected div[name="foo"] not to have an attribute \'name\' with the value \'foo\'')
      })
    })

    it('chains', function() {
      subject.should.have.attr('name').equal('foo')
    })
  })

  describe('class', function() {
    var subject = parse('<div class="foo shazam"></div>')

    it('passes when the element has the class', function() {
      subject.should.have.class('foo')
    })

    it('passes negated when the element does not have the class', function() {
      subject.should.not.have.class('bar')
    })

    it('fails when the element does not have the class', function() {
      (function() {
        subject.should.have.class('bar')
      }).should.fail('expected div.foo.shazam to have class \'bar\'')
    })

    it('fails negated when the element has the class', function() {
      (function() {
        subject.should.not.have.class('foo')
      }).should.fail('expected div.foo.shazam not to have class \'foo\'')
    })
  })

  describe('id', function() {
    var subject = parse('<div id="foo" class="yum" required disabled="disabled"></div>')

    it('passes when the element has the id', function() {
      subject.should.have.id('foo')
    })

    it('passes negated when the element does not have the id', function() {
      subject.should.not.have.id('bar')
    })

    it('passes negated when the element does not have an id', function() {
      document.createElement('div').should.not.have.id('bar')
    })

    it('fails when the element does not have the id', function() {
      (function() {
        subject.should.have.id('bar')
      }).should.fail('expected div#foo.yum[required][disabled="disabled"] to have id \'bar\'')
    })

    it('fails negated when the element has the id', function() {
      (function() {
        subject.should.not.have.id('foo')
      }).should.fail('expected div#foo.yum[required][disabled="disabled"] not to have id \'foo\'')
    })

    it('fails when the element does not have an id', function() {
      var subject = parse('<div></div>');
      (function() {
        subject.should.have.id('foo')
      }).should.fail('expected div to have id \'foo\'')
    })
  })

  describe('html', function() {
    var subject = parse('<section><span>span</span></section>')

    it('passes when the HTML matches', function() {
      subject.should.have.html('<span>span</span>')
    })

    it('passes negated when the HTML doesn\'t match', function() {
      subject.should.not.have.html('<span>div</span>')
    })

    it('fails when the HTML doesn\'t match', function() {
      (function() {
        subject.should.have.html('<span>div</span>')
      }).should.fail('expected section to have HTML \'<span>div</span>\', but the HTML was \'<span>span</span>\'')
    })

    it('fails negated when the HTML matches', function() {
      (function() {
        subject.should.not.have.html('<span>span</span>')
      }).should.fail('expected section not to have HTML \'<span>span</span>\'')
    })
  })

  describe('text', function() {
    var subject = parse('<div>foo</div>')

    it('passes when the text matches', function() {
      subject.should.have.text('foo')
    })

    it('passes negated when the text doesn\'t match', function() {
      subject.should.not.have.text('bar')
    })

    it('fails when the text doesn\'t match', function() {
      (function() {
        subject.should.have.text('bar')
      }).should.fail('expected div to have text \'bar\', but the text was \'foo\'')
    })

    it('fails negated when the text matches', function() {
      (function() {
        subject.should.not.have.text('foo')
      }).should.fail('expected div not to have text \'foo\'')
    })
  })

  describe('value', function() {
    var subject = parse('<input value="foo">')

    it('passes when the value matches', function() {
      subject.should.have.value('foo')
    })

    it('passes negated when the value doesn\'t match', function() {
      subject.should.not.have.value('bar')
    })

    it('fails when the value doesn\'t match', function() {
      (function() {
        subject.should.have.value('bar')
      }).should.fail('expected input[value="foo"] to have value \'bar\', but the value was \'foo\'')
    })

    it('fails negated when the value matches', function() {
      (function() {
        subject.should.not.have.value('foo')
      }).should.fail('expected input[value="foo"] not to have value \'foo\'')
    })
  })

  xdescribe('visible', function() {
    var visible = parse('<div></div>')
    var hidden = parse('<div style="display: none;"></div>')

    beforeEach(function() {
      $(visible, hidden).appendTo('#mocha')
    })

    afterEach(function() {
      $(visible, hidden).remove()
    })

    it('passes when the element is visible', function() {
      visible.should.be.visible
    })

    it('passes negated when the element is hidden', function() {
      hidden.should.not.be.visible
    })

    it('fails when the element is hidden', function() {
      (function() {
        hidden.should.be.visible
      }).should.fail('expected ' + inspect(hidden) + ' to be visible')
    })

    it('fails negated when element is visible', function() {
      (function() {
        visible.should.not.be.visible
      }).should.fail('expected ' + inspect(visible) + ' not to be visible')
    })
  })

  xdescribe('hidden', function() {
    var visible = parse('<div></div>')
    var hidden = parse('<div style="display: none;"></div>')

    beforeEach(function() {
      $(visible, hidden).appendTo('#mocha')
    })

    afterEach(function() {
      $(visible, hidden).remove()
    })

    it('passes when the element is hidden', function() {
      hidden.should.be.hidden
    })

    it('passes negated when the element is visible', function() {
      visible.should.not.be.hidden
    })

    it('fails when the element is visible', function() {
      (function() {
        visible.should.be.hidden
      }).should.fail('expected ' + inspect(visible) + ' to be hidden')
    })

    it('fails negated when element is hidden', function() {
      (function() {
        hidden.should.not.be.hidden
      }).should.fail('expected ' + inspect(hidden) + ' not to be hidden')
    })
  })

  describe('exist', function() {
    it('preserves existing behavior on non-NodeList objects', function() {
      ({}).should.exist
      true.should.exist
    })

    var existent, nonexistent

    beforeEach(function() {
      existent = document.querySelectorAll('#mocha')
      nonexistent = document.querySelectorAll('.nonexistent')
    })

    it('passes when the selection isn\'t empty', function() {
      existent.should.exist
    })

    it('passes negated when the selection is empty', function() {
      nonexistent.should.not.exist
    })

    it('fails when the selection is empty', function() {
      (function() {
        nonexistent.should.exist
      }).should.fail('expected items in NodeList to exist')
    })

    it('fails negated when the selection isn\'t empty', function() {
      (function() {
        existent.should.not.exist
      }).should.fail('expected items in NodeList not to exist')
    })
  })

  describe('empty', function() {
    it('preserves existing behavior on non-NodeList objects', function() {
      ({}).should.be.empty
    })

    var empty = document.createElement('div')
    var nonempty = parse('<div class="non empty"><span></span></div>')

    it('passes when the elment has no children', function() {
      empty.should.be.empty
    })

    it('passes negated when the elment has children', function() {
      nonempty.should.not.be.empty
    })

    it('fails when the elment has children', function() {
      (function() {
        nonempty.should.be.empty
      }).should.fail('expected div.non.empty to be empty')
    })

    it('fails negated when the elment has no children', function() {
      (function() {
        empty.should.not.be.empty
      }).should.fail('expected div to not be empty')
    })
  })

  describe('match', function() {
    it('preserves existing behavior on strings', function() {
      ('hello').should.match(/ello/)
    })

    var subject = parse('<div id="foo"></div>'), subjectList
    before(function() {
      subjectList = document.querySelectorAll('body')
    })

    it('passes when the selection matches the given selector', function() {
      subject.should.match('#foo')
      subjectList.should.match('body')
    })

    it('passes negated when the selection does not match the given selector', function() {
      subject.should.not.match('#bar')
      subjectList.should.not.match('#bar')
    })

    it('passes negated when the NodeList is empty', function() {
      document.querySelectorAll('.nonexistent').should.not.match('.foo')
    })

    it('fails when the selection does not match the given selector', function() {
      (function() {
        subject.should.match('#bar')
      }).should.fail('expected div#foo to match \'#bar\'')
      ;(function() {
        subjectList.should.match('#bar')
      }).should.fail('expected all items in NodeList to match \'#bar\'')
    })

    it('fails negated when the selection matches the given selector', function() {
      (function() {
        subject.should.not.match('#foo')
      }).should.fail('expected div#foo to not match \'#foo\'')
      ;(function() {
        subjectList.should.not.match('body')
      }).should.fail('expected all items in NodeList to not match \'body\'')
    })
  })

  describe('contain', function() {
    it('preserves existing behavior on arrays and strings', function() {
      'example text'.should.contain('example')
      'foo'.should.not.contain('bar');
      ({
        foo: 1,
        bar: 2
      }).should.contain.keys('foo');

      (function() {
        'foo'.should.contain('bar')
      }).should.fail('expected \'foo\' to include \'bar\'');

      (function() {
        'foo'.should.not.contain('bar').and.not.contain('foo')
      }).should.fail('expected \'foo\' to not include \'foo\'')
    })

    describe('text', function() {
      var subject = parse('<div><span class="blurb">example text</span></div>')

      it('passes when the selection contains the given text', function() {
        subject.should.contain('span.blurb')
      })

      it('passes negated when the selection does not contain the given text', function() {
        subject.should.not.contain('example')
      })

      it('fails when the selection does not contain the given text', function() {
        (function() {
          subject.should.contain('aside')
        }).should.fail('expected div to contain \'aside\'')
      })

      it('fails negated when the selection contains the given text', function() {
        (function() {
          subject.should.not.contain('.blurb')
        }).should.fail('expected div to not contain \'.blurb\'')
      })
    })

    describe('element', function() {
      var
        subject = parse('<div><span class="blurb">example text</span><p>lorem ipsum</p></div>'),
        child = subject.children[0],
        nonchild = document.createElement('dd')

      it('passes when the selection contains the given element', function() {
        subject.should.contain(child)
      })

      it('passes negated when the selection does not contain the given element', function() {
        subject.should.not.contain(nonchild)
      })

      it('fails when the selection does not contain the given element', function() {
        (function() {
          subject.should.contain(nonchild)
        }).should.fail('expected div to contain dd')
      })

      it('fails negated when the selection contains the given element', function() {
        (function() {
          subject.should.not.contain(child)
        }).should.fail('expected div to not contain span.blurb')
      })
    })
  })

  describe('descendants', function() {
    var subject = parse('<div><span></span></div>')

    it('passes when the selection has the given selector', function() {
      subject.should.have.descendants('span')
    })

    it('passes negated when the selection does not have the given selector', function() {
      subject.should.not.have.descendants('div')
    })

    it('fails when the selection does not have the given selector', function() {
      (function() {
        subject.should.have.descendants('div')
      }).should.fail('expected div to have \'div\'')
    })

    it('fails negated when the selection has the given selector', function() {
      (function() {
        subject.should.not.have.descendants('span')
      }).should.fail('expected div not to have \'span\'')
    })
  })
})
