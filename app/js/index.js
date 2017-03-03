let addClass = (o, c) => {
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    if (re.test(o.className)) return;
    o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
}
 
let removeClass = (o, c) => {
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
}

const ScrollMachine = require('./ScrollMachine');
//const Sizzle        = require('../../node_modules/sizzle/dist/sizzle');

const standartTrigger = (() => {
	const getTrig = () => (window.innerHeight - 400) / window.innerHeight;
	window.addEventListener('resize', () => {
		trig = getTrig();
	}, false);

	let trig = getTrig();
	return () => trig;
})();

const intervalEach = (n, delay, clb) => {
	let i = 0, interval = false, work = true;
	const r = () => {
		if(!work) return;
		clb(i++);
		if (i < n)
			interval = setTimeout(r, delay);
	}
	r();
	return {
		kill: () => {
			work = false;
			if (interval) clearTimeout(interval);
		}
	}
}

Sizzle('.scroll-animate').forEach(item => {
	new ScrollMachine({
		element: item,
		trigger: standartTrigger,
		offsetTop: 0,
		offsetBottom: 0
	})
	.onTypeChanged((sm, o, n) => {
		if (n !== -1) {
			addClass(item, 'show');
			sm.trigger = 1;
		}
		else {
			removeClass(item, 'show');
			sm.trigger = standartTrigger;
		}
	})
})

Sizzle('.scroll-animate-list').forEach(item => {
	const items = Sizzle('.scroll-animate-item', item);
	let ob = null;

	new ScrollMachine({
		element: item,
		trigger: standartTrigger,
		offsetTop: 0,
		offsetBottom: 0
	})
	.onTypeChanged((sm, o, n) => {
		if (n !== -1) {
			ob = intervalEach(items.length, 200, i => {
				addClass(items[i], 'show');
			});
			sm.trigger = 1;
		}
		else {
			if (ob) ob.kill();
			items.forEach(item => removeClass(item, 'show'));
			sm.trigger = standartTrigger;
		}
	})
})

Sizzle('.parallax').forEach((item, index) => {
	let trn = 200;

	const inst = (sign, p) => item.style.transform = `translate(0, ${ sign * (trn * Math.abs(p) - 100) * 0.7 }px)`;

	new ScrollMachine({
		element: item,
		trigger: standartTrigger,
		offsetTop: 300,
		offsetBottom: 300
	})
	.during((sm, p) => {
		if (index % 2) inst(1, p);
		else inst(-1, p);
	})
	.onInit((sm, t) => {
		if (t === -1)
			sm.f.during(0.001)
		else if (t === 1)
			sm.f.during(1)
	})
})

Sizzle('.parallax-horizontal').forEach((item, index) => {
	let trn = 200;

	const sign = item.classList.contains('left-right') ? -1 : 1;
	const opacity = !item.classList.contains('no-opacity')

	const inst = (p) => {
		item.style.transform = `translate(${ sign * (trn * Math.abs(p)) * 0.5 }px, 0)`;
		if (opacity) item.style.opacity = 0.1 - p * 0.1;
	}

	new ScrollMachine({
		element: item,
		trigger: standartTrigger,
		offsetTop: 400,
		offsetBottom: 400
	})
	.during((sm, p) => {
		inst(1 - p);
	})
	.onInit((sm, t) => {
		if (t === 1)
			sm.f.during(1)
		else
			sm.f.during(0.001)
	})
})