import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import PosterModal from './PosterModal';

function SearchPoster(props) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className='search-poster-body' align='center'>
                <div>
                    <img src={props.image.replace("_V1_", "_V1_UX230_CR0,3,213,320_AL_")} />
                    <p>{props.title}</p>
                    <p>{props.description.slice(0, 6)}</p>
                </div>
                <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => setModalShow(true)}
                >
                    more
                </Button>
            </div>
            {modalShow ? <PosterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={props.id}
            /> : <></>}
        </>
    );
}

SearchPoster.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default SearchPoster;