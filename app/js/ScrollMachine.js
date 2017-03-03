module.exports = class ScrollMachine {
	constructor (config) {
		if (config) this.configure (config);

		this.f = {};
		this.f.onTypeChanged = () => {};
		this.f.during = () => {};
		this.f.onEnter = () => {};
		this.f.onLeave = () => {};
		this.f.scrollFull = () => {};

		const 
			getRect = () => this.element.getBoundingClientRect(),
			getHeight = () => this.element.offsetHeight,
			getWindow = () => ({ width: window.innerWidth, height: window.innerHeight });


		const getInfo = () => {
			const 
				_rect = getRect(),
				wnd  = getWindow(),
				trigger = wnd.height * ((typeof this.trigger === 'function') ? this.trigger() : this.trigger);

			let type = 0;
			const rect = { top: _rect.top, left: _rect.left, bottom: _rect.bottom, right: _rect.right };


			rect.top -= this.offsetTop;
			rect.bottom += this.offsetBottom;


			if (rect.top >= trigger) type = -1;
			else if (rect.bottom <= trigger) type = 1;

			return { type, rect, trigger };
		}

		this.getInfo = getInfo;

		let savedType = -500;

		this.work = (e) => {
			const { type, rect, trigger } = getInfo();
			this.f.scrollFull(type, rect);
			

			if (savedType !== type) {
				if (type === -1) {
					this.f.onLeave();
				}
				else if (type === 0) {
					this.f.onEnter();
				}
				else if (type === 1) {
					this.f.onLeave();
				}
				this.f.onTypeChanged(savedType, type);
				savedType = type;
			}
			
			if (type === 0) {
				const 
					height = rect.bottom - rect.top,
					top = Math.abs(rect.top - trigger);
				
				this.f.during(top / height);
			}
		}


		window.addEventListener('scroll', this.work, false);
	}
	configure (config) {
		if (!this.config) this.config = {};
		Object.assign(this.config, config);
		

		(this.fixConfig = (config) => {
			if (!config.element) throw new Error('No Element');
			if (!config.trigger) config.trigger = 0.5;
			if (!config.offsetTop) config.offsetTop = 0;
			if (!config.offsetBottom) config.offsetBottom = 0;

			this.config = config;
			Object.assign(this, config);
		})(this.config);


		Object.assign(this, this.config);
		return this;
	}
	onInit (clb) {
		this.f.onInit = (...arg) => clb(this, ...arg);
		this.f.onInit(this.getInfo().type);
	}
	onTypeChanged (clb) {
		this.f.onTypeChanged = (...arg) => clb(this, ...arg);
		return this;
	}
	onEnter (clb) {
		this.f.onEnter = (...arg) => clb(this, ...arg);
		return this;
	}
	onLeave (clb) {
		this.f.onLeave = (...arg) => clb(this, ...arg);
		return this;
	}
	during (clb) {
		this.f.during = (...arg) => clb(this, ...arg);
		return this;
	}
	destroy () {
		window.removeEventListener('scroll', this.work, false);
	}
}