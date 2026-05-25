import React from "react";
import { ProviderFeedback } from "../context/ContextoFeedback";
import Feedback from "./Feedback";

const ScreenFeedbacks = () => {

    return (
        <React.Fragment>
            <ProviderFeedback>
                <Feedback />
            </ProviderFeedback>
        </React.Fragment>
      
    )
}

export default ScreenFeedbacks