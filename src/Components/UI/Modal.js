import classes from './Modal.module.css'

const Backdrop = (props) => <div onClick = {() => props.clsModal(false)} className = {classes.backdrop}></div>

const OverLay = (props) => {
	return <div className = {classes.modal}>
		<div className = {classes.content}>{props.children}</div>
	</div>
}



const Modal = (props) => {

	return(<>
		<Backdrop clsModal = {(data) => props.closeModal(data)}/> 
		<OverLay>{props.children}</OverLay>
	</>
		)

}

export default Modal;