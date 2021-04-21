import React, { Fragment } from 'react';
import NavBarApp from '../components/NavBarApp';
import TableDataClient from '../components/TalbleDataClient'

const FormListarClientes = (props) => {
    return (
        <form>
            <Fragment>
                <NavBarApp />
                <TableDataClient />
            </Fragment>
        </form>
    );
}

export default FormListarClientes;