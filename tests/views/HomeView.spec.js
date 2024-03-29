import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { HomeView } from 'views/HomeView/HomeView';
import { mount } from 'enzyme';

function shallowRender (component) {
    const renderer = TestUtils.createRenderer();

    renderer.render(component);
    return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
    return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
    return shallowRender(<HomeView {...props} />);
}

describe('(View) Home', function () {
    let _rendered, _props, _spies;

    beforeEach(function () {
        _spies = {};
        _props = {
            counter: 0,
            ...bindActionCreators({
                doubleAsync: (_spies.doubleAsync = sinon.spy()),
                increment: (_spies.increment = sinon.spy())
            }, _spies.dispatch = sinon.spy())
        };

        shallowRenderWithProps(_props);
        _rendered = renderWithProps(_props);
    });

    it('Should include an <h1> with welcome text.', function () {
        const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');

        expect(h1).to.exist;
        expect(h1.textContent).to.match(/Welcome to the React Redux Starter Kit/);
    });

    it('Should render with an <h2> that includes Sample Counter text.', function () {
        const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2');

        expect(h2).to.exist;
        expect(h2.textContent).to.match(/Sample Counter/);
    });

    it('Should render props.counter at the end of the sample counter <h2>.', function () {
        const h2 = TestUtils.findRenderedDOMComponentWithTag(
      renderWithProps({ ..._props, counter: 5 }), 'h2'
    );

        expect(h2).to.exist;
        expect(h2.textContent).to.match(/5$/);
    });

    it('Should render exactly two buttons.', function () {
        const wrapper = mount(<HomeView />);

        expect(wrapper).to.have.descendants('.btn');
    });

    describe('An increment button...', function () {
        let _btn;

        beforeEach(() => {
            _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Increment/.test(a.textContent))[0];
        });

        it('should be rendered.', function () {
            expect(_btn).to.exist;
        });

        it('should dispatch an action when clicked.', function () {
            _spies.dispatch.should.have.not.been.called;
            TestUtils.Simulate.click(_btn);
            _spies.dispatch.should.have.been.called;
        });
    });

    describe('A Double (Async) button...', function () {
        let _btn;

        beforeEach(() => {
            _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Double/.test(a.textContent))[0];
        });

        it('should be rendered.', function () {
            expect(_btn).to.exist;
        });

        it('should dispatch an action when clicked.', function () {
            _spies.dispatch.should.have.not.been.called;
            TestUtils.Simulate.click(_btn);
            _spies.dispatch.should.have.been.called;
        });
    });
});
