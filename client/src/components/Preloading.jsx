import React from 'react';
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import movie from "../asset/movie.json"

function Preloading() {

    return (
        <motion.div
            key="preloading"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
        >
            <Player
                autoplay
                loop
                src={movie}
                style={{ height: "100px", width: "100px" }}
            ></Player>
        </motion.div>
    );
}

export default Preloading;