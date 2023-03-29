import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useSelector } from "react-redux";
import LightParticlesConfig from "./config/light_particle_config";
import DarkParticlesConfig from "./config/dark_particle_config";

const ParticlesBackground = () => {
  const isPremiumUser = useSelector((state) => state.premium.isDark);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={isPremiumUser ? DarkParticlesConfig : LightParticlesConfig}
    />
  );
};

export default ParticlesBackground;
