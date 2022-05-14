import React, { Component } from "react";
// import Loading from "../../utils/Loading";

class Viewer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			preset: {
				items_visibles: 1,
				total_paginas: 0,
				total_items: 0,
				pagina_actual: 1
			},
			visibility: [],
			//Agregue esta propiedad al estado para poder hacer la paginacion
			paginationVisibility: []
		};
		this.setPagina = this.setPagina.bind(this);
		this.movePageBack = this.movePageBack.bind(this);
		this.movePageFoward = this.movePageFoward.bind(this);
		this.moveFirstPage = this.moveFirstPage.bind(this);
		this.moveLastPage = this.moveLastPage.bind(this);
		this.calcular = this.calcular.bind(this);
	}

	movePageBack() {
		let pagina = this.state.preset.pagina_actual - 1;
		if(pagina < 1) {
			pagina = 1;
		}
		this.setPagina(pagina);
	}

	movePageFoward() {
		let pagina = this.state.preset.pagina_actual + 1;
		if(pagina > this.state.preset.total_paginas) {
			pagina = this.state.preset.total_paginas;
		}
		this.setPagina(pagina);
	}

	//Estos dos metodos son para llevar al inicio o al final directamente
	moveLastPage(){
		this.setPagina(this.state.preset.total_paginas);
	}

	moveFirstPage(){
		this.setPagina(1)
	}

	setPagina(nro_pagina) {
		let mostrar_desde = (nro_pagina * this.state.preset.items_visibles) - (this.state.preset.items_visibles - 1);
		let mostrar_hasta = (nro_pagina * this.state.preset.items_visibles);
		//En estas variables encierro el total de paginas y la pagina inicial/final para el paginado
		let totalPages = this.state.preset.total_paginas;
		let startPage, endPage;
		var w = window.innerWidth;

		if(mostrar_hasta > this.state.preset.total_items) {
			mostrar_hasta = this.state.preset.total_items;
		}

		this.setState({
			preset: {
				...this.state.preset,
				pagina_actual: nro_pagina
			}
		});

		let buffer = Object.assign([], this.state.visibility);
		for(let i=0; i < buffer.length; i++) {
			if(((i + 1) >= mostrar_desde) && ((i + 1) <= mostrar_hasta)) {
				buffer[i] = {display: "block"};
			} else {
				buffer[i] = {display: "none"};
			}
		}
		if(w < 460){
			//Algoritmo para paginado
			if (totalPages <= 6) {
				// Si son menos de 10 que me muestre todo
				startPage = 1;
				endPage = totalPages;
			} else {
				// Si son menos o igual a 6 que me siga mostrando la misma cantidad de paginas
				if (nro_pagina <= 3) {
					startPage = 1;
					endPage = 6;
				//Si estamos en las ultimas 4 paginas que no cargue mas paginas
				} else if (nro_pagina + 3 >= totalPages) {				
					startPage = totalPages - 5;
					endPage = totalPages;
				//Y por ultimo sino se cumple ninguna de las condiciones anteriores, que cargue mas paginas.
				} else {
					startPage = nro_pagina - 2;
					endPage = nro_pagina + 3;
				}
			}	
		}else{
			//Algoritmo para paginado
			if (totalPages <= 10) {
				// Si son menos de 10 que me muestre todo
				startPage = 1;
				endPage = totalPages;
			} else {
				// Si son menos o igual a 6 que me siga mostrando la misma cantidad de paginas
				if (nro_pagina <= 6) {
					startPage = 1;
					endPage = 10;
				//Si estamos en las ultimas 4 paginas que no cargue mas paginas
				} else if (nro_pagina + 4 >= totalPages) {				
					startPage = totalPages - 9;
					endPage = totalPages;
				//Y por ultimo sino se cumple ninguna de las condiciones anteriores, que cargue mas paginas.
				} else {
					startPage = nro_pagina - 5;
					endPage = nro_pagina + 4;
				}
			}
		}
		
		//Buffer donde se van a guardar el display de las paginas
		let paginationBuffer = Object.assign([], this.state.paginationVisibility);
		for(let i=0; i < paginationBuffer.length; i++) {
			if(((i + 1) >= startPage) && ((i + 1) <= endPage)) {
				paginationBuffer[i] = {display: "block"};
			} else {
				paginationBuffer[i] = {display: "none"};
			}
		}
		
		this.setState({
			loading: false,
			visibility: buffer,
			paginationVisibility: paginationBuffer
		});
	}

	calcular() {
		//Calculos
		let total = parseInt(React.Children.count(this.props.children));
		let visibles = parseInt(this.props.visibles, 10);
		let paginas = parseInt((total / visibles), 10);
		if((total % visibles) > 0) {
			paginas++;
		}
		//Generar Buffer de Estado
		let buffer = [];
		for(let i=0; i < total; i++) {
			buffer.push({display: "none"});
		}
		//Genera Buffer para el paginado
		let paginationBuffer = [];
		for(let i=0; i < paginas; i++) {
			paginationBuffer.push({display: "none"});
		}

		this.setState({
			visibility: buffer,
			paginationVisibility: paginationBuffer
		}, () => {
			this.setState({
				preset: {
					...this.state.preset,
					items_visibles: visibles,
					total_items: total,
					total_paginas: paginas
				}
			}, () => {
				console.log(total +" "+ visibles)
				if(total > 0 && visibles > 0) {
					this.setPagina(1);
				}else{
					this.setState({
						loading: false
					})
				}
			});
		});
	}

	componentDidUpdate(preProps) {
		if((this.state.preset.total_items !== React.Children.count(this.props.children)) || this.props.visibles !== preProps.visibles) {
			this.calcular();
		}
	}

	componentDidMount() {
		this.calcular();
		//window.addEventListener("resize", this.calcular);
	}

	render() {
		const paginas = [];
		for(let i = 1; i < (this.state.preset.total_paginas + 1); i++) {
			if(i===this.state.preset.pagina_actual) {
				paginas.push(<li key={`btn-pag-${i}`} style={this.state.paginationVisibility[i-1]} className="selected" onClick={(e) => this.setPagina(i)}>{i}</li>);
			} else {
				paginas.push(<li key={`btn-pag-${i}`} style={this.state.paginationVisibility[i-1]} onClick={(e) => this.setPagina(i)}>{i}</li>);
			}
		}
		let i = -1;
		const childrens = React.Children.map(this.props.children, (children, index) => {
			i++;
			return(
				<div key={`d-${index}`} style={this.state.visibility[i]} className="animated zoomIn">
					{children}
				</div>
			);
		});
		return (
			<React.Fragment>
			{
				this.state.loading ?
					<div><Loading margins="150px" /></div>
				:
				this.props.children.length === 0 ?
				<div className="ZonaLocalidad-titulo" style={{textAlign: 'center'}}>
					<h3 style={{color: `#722789`}}>No se encontraron elementos</h3>
				</div>
				:
				this.props.clase === "alojamiento" ?
				<div className="Viewer">
					<div className="btn-left" onClick={this.movePageBack}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
					</div>
					<div className="items">
						{childrens}
					</div>
					<div className="btn-right" onClick={this.movePageFoward}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
					</div>
					<div className="pages" >
						<div className="btn-left"  onClick={this.moveFirstPage}>
							<i className="fas fa-backward"></i>					
						</div>
						<ul style={{textAlign: 'center'}}>
							{paginas}
						</ul>
						<div className="btn-right" onClick={this.moveLastPage}>
							<i className="fas fa-forward"></i>
						</div>
					</div>	
				</div>
				: this.props.clase === "halloween" ? 
				<div className="Viewer">
					<div className="btn-left"  onClick={this.movePageBack}>
						<svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
					</div>
					<div className="items">
						{childrens}
					</div>
					<div className="btn-right" style={{color: "white"}} onClick={this.movePageFoward}>
						<svg  fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
					</div>
					<div className="pagesBullets" >
						{/*<div className="btn-left" onClick={this.moveFirstPage}>
							<i className="fas fa-backward" style={{color: "white"}}></i>					
						</div>*/}
						<ul style={{textAlign: 'center'}}>
							{paginas}
						</ul>
						{/*<div className="btn-right" onClick={this.moveLastPage}>
							<i className="fas fa-forward" style={{color: "white"}}></i>
						</div>*/}
					</div>	
				</div>
				:
				<div className="ViewerListados">
					<div>
						{childrens}
					</div>
					<div className="pages" >
						<div className="btn-left" onClick={this.moveFirstPage}>
							<i className="fas fa-backward"></i>					
						</div>
						<ul style={{textAlign: 'center'}}>
							{paginas}
						</ul>
						<div className="btn-right" onClick={this.moveLastPage}>
							<i className="fas fa-forward"></i>
						</div>
					</div>	
				</div>				
			}
			</React.Fragment>
		);
	}
}

export default Viewer;