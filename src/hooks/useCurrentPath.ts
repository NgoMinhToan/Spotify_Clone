import { matchPath, useLocation } from 'react-router-dom'
import path from '../constants/path'

const useCurrentPath = () => {
    const location = useLocation();

    const currentPath = Object.values(path).find((tabPath) => {
        const match = matchPath({ path: tabPath }, location.pathname);
        return match !== null;
    });

    return currentPath;
}

export default useCurrentPath