import { useDeviceMode } from '../../contexts/DeviceModeContext';

export default function Footer() {
    const { isMobileMode } = useDeviceMode();
    return (
        <footer className="mt-20 border-t border-gray-200 bg-white">
            <div className="container mx-auto px-6 py-12">
                <div className={isMobileMode ? "flex flex-col items-center space-y-6 text-center" : "flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"}>
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <div className="text-lg font-bold text-black mb-2">서원토건</div>
                        <div className="text-gray-500 text-sm">
                            © 2026 (주)서원토건 미래전략TF
                        </div>
                    </div>

                    {/* Links */}
                    <div className={isMobileMode ? "flex flex-wrap justify-center gap-4 text-sm text-gray-500" : "flex items-center space-x-8 text-sm text-gray-500"}>
                        <span>Vision 2030</span>
                        <span className={isMobileMode ? "hidden" : "w-px h-4 bg-gray-300"}></span>
                        <span>미래전략TF</span>
                        <span className={isMobileMode ? "hidden" : "w-px h-4 bg-gray-300"}></span>
                        <span>산학협력</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
