import React from "react";
import { Reveal } from "../../anim/anim";

/* ═══════════════════════════════════════════════════
   NVIDIA GTC 2026 — article content
   ═══════════════════════════════════════════════════ */
export default function GTCPost() {
  return (
    <div className="bl__body">
      <Reveal>
        <p>
          I went to NVIDIA GTC without much of a plan. Honestly I just wanted to
          see what direction the industry was heading, maybe sit in on a few
          talks, and hang out in San Jose for a couple days. Figured it would be
          fun and I'd get something out of it. I didn't expect it to actually
          shift how I think about what I want to do.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2>The Student Side</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          We started at San Jose State University for the student program. There
          was a keynote and then a panel talk, and the thing that stuck with me
          was how bluntly they talked about the difference between using AI and
          actually building it. A lot of people can prompt a model or fine-tune
          something off a tutorial; the panel kept coming back to the idea that
          the people who understand the infrastructure, the training pipelines,
          the actual math behind why something works or doesn't, those are the
          ones who end up shaping what gets built. That hit different because I'd
          been going back and forth in my head about whether the stuff I'm
          learning in school matters when everyone and their mom can use ChatGPT
          now. Hearing it framed that way cleared some of that noise up.
        </p>
      </Reveal>

      <div className="bl__img-row bl__img-row--2">
        <Reveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/image000001.jpg" alt="GTC student event" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/PXL_20260318_022648989.jpg" alt="Group outside venue" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <h2>The Exhibit Hall</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          The main exhibit hall was a completely different energy. Physical AI,
          edge computing, robotics, health sciences. It wasn't just booths with
          slide decks; people had live demos running. You could see autonomous
          systems responding in real time, edge devices doing inference locally,
          robots navigating environments. I spent a lot of time just walking
          around watching things run.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          I talked to a bunch of people who were actually implementing NVIDIA's
          products in production. Not researchers, not evangelists; engineers and
          founders who had actual deployment problems and were solving them with
          this stuff. Those conversations were probably more valuable than any
          talk I sat in on. You get a very different picture of a technology when
          someone explains the parts that don't work well yet.
        </p>
      </Reveal>

      <div className="bl__img-row bl__img-row--2">
        <Reveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_9577.jpg" alt="Exhibit hall AI presentation" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_8040.JPG" alt="Group at GTC stage" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <h2>Surgical Robotics</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          The thing that genuinely stopped me in my tracks was the healthcare
          robotics section. XRlabs had a booth with a remote surgery setup;
          haptic feedback, live video, the whole loop running right there in
          front of you. I stood there way longer than I should have asking
          questions about latency and what happens when the connection degrades.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          But it wasn't just them. CMR Surgical was there showing how they're
          training the next generation of intelligent systems for their Versius
          robot, contributing to the Open-H dataset for healthcare robotics.
          Johnson & Johnson MedTech had their MONARCH platform for urology
          running on NVIDIA Isaac and IGX Thor. Moon Surgical was demoing their
          Maestro System, basically a digital surgical assistant powered by
          Holoscan. And Virtual Incision had their MIRA system, using Isaac for
          Healthcare to simulate robotic-assisted procedures. It was a lot of
          surgical robotics in one room.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          I've spent most of my time building ML models and computer vision
          pipelines, but seeing all of that made something click. Healthcare is
          where I want to apply this stuff. Not in a vague "AI for good" way;
          specifically, the intersection of real-time systems, computer vision,
          and surgical robotics. The technical problems are genuinely hard and the
          stakes are high. If the model is wrong, someone gets hurt. That kind of
          constraint forces you to actually understand what you're building
          instead of shipping something that works 90% of the time and calling it
          done.
        </p>
      </Reveal>

      <div className="bl__img-row bl__img-row--1">
        <Reveal delay={0.1}>
          <div className="bl__img-wrap">
            <img src="/NvidiaGTC/IMG_9648.jpg" alt="Surgical robotics demo at GTC" />
          </div>
          <p className="bl__img-caption">Surgical robotics demos at GTC</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <h2>What I Took Away</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          After GTC I spent a lot of time thinking. The job market right now is
          rough, and I'd been feeling a lot of pressure to just land something
          and figure the rest out later. But seeing what people are building, and
          more importantly how they got there, changed my perspective a bit. A
          lot of the founders I talked to didn't follow the standard path. They
          found a problem they actually cared about and built around it.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          I keep coming back to the idea of starting something. A startup, or at
          least some kind of venture where I'm building toward a thing I actually
          believe in rather than optimizing someone else's ad pipeline. I know
          I'd need to learn a lot beyond just the engineering side; business,
          fundraising, hiring, all of it. But the technical foundation is there,
          and now I have a clearer picture of the domain I want to work in.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          For the first time in a while I feel like I have a direction. Not a
          plan exactly, more like a heading. Telesurgery, healthcare AI, embedded
          systems. The specifics will change but the general area feels right.
          GTC didn't teach me that; it just made it harder to ignore.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          Oh, and because of how much this conference got into my head, I ended
          up buying a robot. But that's a whole other story.
        </p>
      </Reveal>

      <div className="bl__img-row bl__img-row--1">
        <Reveal delay={0.1}>
          <div className="bl__img-wrap bl__img-wrap--tall">
            <img src="/NvidiaGTC/IMG20260317174337.jpg" alt="San Jose" />
          </div>
        </Reveal>
      </div>

    </div>
  );
}
