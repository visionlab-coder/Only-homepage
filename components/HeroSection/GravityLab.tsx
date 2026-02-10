import React, { useState, useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { RefreshCw } from 'lucide-react';

const GravityLab: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const [isReady, setIsReady] = useState(false);

    const initPhysics = useCallback(() => {
        if (!sceneRef.current) return false;

        // Cleanup previous instance
        if (renderRef.current) {
            Matter.Render.stop(renderRef.current);
            if (renderRef.current.canvas) {
                renderRef.current.canvas.remove();
            }
        }
        if (runnerRef.current) {
            Matter.Runner.stop(runnerRef.current);
        }
        if (engineRef.current) {
            Matter.Engine.clear(engineRef.current);
        }

        const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Events } = Matter;

        const engine = Engine.create();
        engineRef.current = engine;

        const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
            }
        });
        renderRef.current = render;

        // Walls
        const wallThickness = 60;
        const walls = [
            Bodies.rectangle(width / 2, height + 30, width, wallThickness, {
                isStatic: true,
                render: { fillStyle: '#333' }
            }),
            Bodies.rectangle(width + 30, height / 2, wallThickness, height * 3, {
                isStatic: true
            }),
            Bodies.rectangle(-30, height / 2, wallThickness, height * 3, {
                isStatic: true
            })
        ];

        // Keywords
        const keywords = [
            'INNOVATION', 'FUTURE', 'STRATEGY', 'AI', 'DATA', 'NEXUS', 'VISION', 'GROWTH',
            'TECH', 'GLOBAL', 'SECURITY', 'CLOUD', 'QUANTUM', 'ROBOTICS', 'SCALE', 'SPEED',
            'CREATIVITY', 'DISRUPTION', 'METAVERSE', 'HYPER-SCALE', 'AGILE', 'IMPACT',
            'GOOGLE', 'GRAVITY', 'PHYSICS', 'CHAOS'
        ];

        const boxes = keywords.map((word) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 1500 - 100;
            const boxWidth = word.length * 16 + 40;
            const boxHeight = 54;

            const colors = ['#06b6d4', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return Bodies.rectangle(x, y, boxWidth, boxHeight, {
                chamfer: { radius: 10 },
                restitution: 0.6,
                friction: 0.5,
                density: 0.04,
                render: {
                    fillStyle: color,
                    strokeStyle: '#ffffff',
                    lineWidth: 2
                },
                // Store text data in plugin
                plugin: {
                    text: { content: word, color: '#ffffff', size: 16, family: 'Orbitron' }
                }
            } as any);
        });

        World.add(engine.world, [...walls, ...boxes]);

        // Mouse interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Run physics
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);
        setIsReady(true);

        // Text rendering loop
        Events.on(render, 'afterRender', () => {
            const context = render.context;
            const bodies = Composite.allBodies(engine.world);
            context.font = "bold 16px Orbitron, sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";

            bodies.forEach((body: any) => {
                if (body.plugin?.text) {
                    const { content, color } = body.plugin.text;
                    context.fillStyle = color;
                    context.save();
                    context.translate(body.position.x, body.position.y);
                    context.rotate(body.angle);
                    context.fillText(content, 0, 0);
                    context.restore();
                }
            });
        });

        return true;
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const loaded = initPhysics();

        if (!loaded) {
            interval = setInterval(() => {
                if (initPhysics()) {
                    clearInterval(interval);
                }
            }, 200);
        }

        const handleResize = () => initPhysics();
        window.addEventListener('resize', handleResize);

        return () => {
            if (interval) clearInterval(interval);
            window.removeEventListener('resize', handleResize);

            // Cleanup on unmount
            if (renderRef.current) {
                Matter.Render.stop(renderRef.current);
                if (renderRef.current.canvas) {
                    renderRef.current.canvas.remove();
                }
            }
            if (runnerRef.current) {
                Matter.Runner.stop(runnerRef.current);
            }
            if (engineRef.current) {
                Matter.Engine.clear(engineRef.current);
            }
        };
    }, [initPhysics]);

    return (
        <section className="relative w-full h-screen bg-[#111] overflow-hidden flex flex-col">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Title */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-center pointer-events-none select-none w-full px-4">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-2 brand-font"
                    style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
                    GRAVITY LAB
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Interactive Physics Simulation</p>
            </div>

            {/* Physics Canvas */}
            <div
                ref={sceneRef}
                className="w-full h-full absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
            />

            {/* Reset Button */}
            <button
                onClick={initPhysics}
                className="absolute bottom-10 right-10 p-4 bg-cyan-600/20 backdrop-blur-md border border-cyan-500/50 rounded-full hover:bg-cyan-500 hover:text-white text-cyan-400 transition-all z-20 group shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                aria-label="Reset animation"
            >
                <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
            </button>
        </section>
    );
};

export default GravityLab;
