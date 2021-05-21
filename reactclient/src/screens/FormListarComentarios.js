import React, { Fragment } from 'react';
import NavBarApp from '../components/NavBarApp';
import TableDataComents from '../components/TableDataComents';

const FormListarComentarios = (props) => {
    return (
        <form>
            <Fragment>
                <NavBarApp />
                <TableDataComents />
            </Fragment>
        </form>
    );
}

export default FormListarComentarios;