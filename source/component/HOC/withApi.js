
import React, { Component, createContext } from 'react';
import { api, TOKEN, GROUP_ID } from "../../config/api";

export const withApi = (Enchanced) =>
    class WithApi extends Component {


        render () {
            <Enchanced />
        }
    };
