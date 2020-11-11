import React, { Component } from 'react';
import './NewContact.scss';
import { Avatar } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

class NewContact extends Component {
    render() {
        return (
            <div className="newContact">
                <motion.div className="newContact__sidebar" initial={{x: -100+"vw"}} animate={{x: 0, transition: {duration: 0.8}}}>
                    <div className="newContact__sidebar__header">
                        <Link to="/"><ArrowBack /></Link>
                        New contact
                    </div>
                    <div className="newContact__sidebar__content">
                        <Avatar className="newContact__sidebar__content-avatar"/>
                    </div>
                </motion.div>
            </div>
        );
    }
}

export default NewContact;