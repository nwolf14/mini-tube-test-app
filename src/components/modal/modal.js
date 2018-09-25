
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CustomModal({ 
	showModal = false, 
	toggleModal = () => {},
	className = '',
	modalTitle = '',
	children = null
}) {
	return (
		<Modal isOpen={showModal} toggle={toggleModal} className={className}>
			<ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
			<ModalBody>
				{children}
			</ModalBody>
		</Modal>
	);
}

CustomModal.propTypes = {
	showModal: PropTypes.any.isRequired,
	toggleModal: PropTypes.func.isRequired,
	className: PropTypes.string,
	modalTitle: PropTypes.string.isRequired
}

export default CustomModal;