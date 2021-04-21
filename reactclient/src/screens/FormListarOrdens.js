import React, { Fragment } from 'react';
import NavBarApp from '../components/NavBarApp';
import TableDataOrders from '../components/TableDataOrders';

const FormListarClientes = (props) => {
    return (
        <form>
            <Fragment>
                <NavBarApp />
                <TableDataOrders />
            </Fragment>
        </form>
    );
}

export default FormListarClientes;