import React from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { routes } from '../../common/constants';
import { getTranslations } from '../../common/helpers';

const T = getTranslations('navigation');


class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		console.log(this.props.userData)
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand tag={Link} to={routes.HOME}>REACT APP</NavbarBrand>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to={routes.LOGIN}>{T.loginSignup}</NavLink>
						</NavItem>
						{this.props.userData &&
							<NavItem>
								<NavLink tag={Link} to={routes.LOGIN}>Cipki da zalogowanych</NavLink>
							</NavItem>
						}
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									Option 1
								</DropdownItem>
								<DropdownItem>
									Option 2
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									Reset
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

function mapStateToProps(state) {
    const { userData } = state;

    return {
        userData
    }
}

export default connect(mapStateToProps, undefined)(Navigation);