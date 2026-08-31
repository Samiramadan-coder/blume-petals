"use client";

import { useEffect, useRef, useState } from "react";

import {
  Group,
  Image as KonvaImage,
  Layer,
  Stage,
  Transformer,
} from "react-konva";

import type Konva from "konva";

type FlowerSlot = {
  variant_id: number;
  qty: number;
  price: number;
  name: string;
  image_url: string;
};

type BouquetData = {
  flowersCount: number;
  template_id: number;
  template_url: string;
  slots: FlowerSlot[];
};

type BouquetEditorProps = {
  data: BouquetData;
  width?: number;
};

type FlowerItem = {
  id: string;

  variant_id: number;

  name: string;

  image_url: string;

  x: number;
  y: number;

  width: number;
  height: number;

  rotation: number;

  scaleX: number;
  scaleY: number;
};

type StableFlowerInstance = {
  id: string;

  variant_id: number;

  name: string;

  image_url: string;
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/*
|--------------------------------------------------------------------------
| Virtual Design Size
|--------------------------------------------------------------------------
*/

const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 1000;

/*
|--------------------------------------------------------------------------
| Vase
|--------------------------------------------------------------------------
*/

const VASE_WIDTH = 480;
const VASE_BOTTOM = 45;

const VASE_RIM_Y_RATIO = 0.145;
const VASE_RIM_WIDTH_RATIO = 0.62;
const VASE_RIM_DEPTH_RATIO = 0.055;

const DEFAULT_FLOWER_FRONT_RATIO = 0.55;

/*
|--------------------------------------------------------------------------
| New Flower Spawn Area
|--------------------------------------------------------------------------
|
| الورود الجديدة ستظهر في المنطقة
| الموجودة أعلى الفازة.
|
| المستخدم يسحبها بنفسه ويضعها
| داخل البوكيه.
|
*/

const SPAWN_AREA_START_X = 120;
const SPAWN_AREA_START_Y = 330;

const SPAWN_AREA_COLUMNS = 4;

const SPAWN_AREA_GAP_X = 175;
const SPAWN_AREA_GAP_Y = 120;

const SPAWN_FLOWER_HEIGHT = 240;

export default function BouquetEditor({
  data,
  width = 220,
}: BouquetEditorProps) {
  const transformerRef = useRef<Konva.Transformer>(null);

  const selectedNodeRef = useRef<Konva.Image>(null);

  const previousTemplateIdRef = useRef(data.template_id);

  const height = width * (DESIGN_HEIGHT / DESIGN_WIDTH);

  const stageScale = width / DESIGN_WIDTH;

  const vaseImage = useImage(data.template_url);

  /*
   * أول ما الصفحة تفتح
   * الورود الموجودة حاليًا تظهر
   * في الـ staging area.
   */
  const [flowers, setFlowers] = useState<FlowerItem[]>(() =>
    createInitialFlowers(data.slots),
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  /*
|--------------------------------------------------------------------------
| Sync quantities
|--------------------------------------------------------------------------
|
| عند إضافة وردة:
|
| الورود القديمة لا تتحرك.
|
| الوردة الجديدة فقط تظهر
| بعيد عن الفازة.
|
*/
  useEffect(() => {
    const templateChanged = previousTemplateIdRef.current !== data.template_id;

    /*
     * لو المستخدم غير الفازة نفسها
     * نعيد الـ staging.
     */
    if (templateChanged) {
      previousTemplateIdRef.current = data.template_id;

      setFlowers(createInitialFlowers(data.slots));

      setSelectedId(null);

      return;
    }

    setFlowers((currentFlowers) =>
      reconcileFlowerLayout(currentFlowers, data.slots),
    );
  }, [data.slots, data.template_id]);

  /*
|--------------------------------------------------------------------------
| Selected flower
|--------------------------------------------------------------------------
*/

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    const stillExists = flowers.some((flower) => flower.id === selectedId);

    if (!stillExists) {
      setSelectedId(null);
    }
  }, [flowers, selectedId]);

  /*
|--------------------------------------------------------------------------
| Transformer
|--------------------------------------------------------------------------
*/

  useEffect(() => {
    const transformer = transformerRef.current;

    if (!transformer) {
      return;
    }

    if (selectedId && selectedNodeRef.current) {
      transformer.nodes([selectedNodeRef.current]);
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();
  }, [selectedId, flowers]);

  const vaseRect = getVaseRect(vaseImage);

  function updateFlower(id: string, updates: Partial<FlowerItem>) {
    setFlowers((current) =>
      current.map((flower) =>
        flower.id === id
          ? {
              ...flower,
              ...updates,
            }
          : flower,
      ),
    );
  }

  return (
    <div
      style={{
        width,
        height,
      }}
      className="overflow-hidden rounded-xl bg-white"
    >
      <Stage
        width={width}
        height={height}
        scaleX={stageScale}
        scaleY={stageScale}
        onMouseDown={(event) => {
          if (event.target === event.target.getStage()) {
            setSelectedId(null);
          }
        }}
        onTouchStart={(event) => {
          if (event.target === event.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {/* ------------------------------------------------ */}
          {/* Vase Back */}
          {/* ------------------------------------------------ */}

          {vaseImage && (
            <KonvaImage
              image={vaseImage}
              x={vaseRect.x}
              y={vaseRect.y}
              width={vaseRect.width}
              height={vaseRect.height}
              listening={false}
            />
          )}

          {/* ------------------------------------------------ */}
          {/* Full Flowers */}
          {/* ------------------------------------------------ */}

          {flowers.map((flower) => (
            <EditableFlower
              key={flower.id}
              flower={flower}
              selected={selectedId === flower.id}
              onSelect={() => setSelectedId(flower.id)}
              onChange={(updates) => updateFlower(flower.id, updates)}
              nodeRef={selectedId === flower.id ? selectedNodeRef : undefined}
            />
          ))}

          {/* ------------------------------------------------ */}
          {/* Vase Front */}
          {/* ------------------------------------------------ */}

          {vaseImage && <VaseFront image={vaseImage} rect={vaseRect} />}

          {/* ------------------------------------------------ */}
          {/* Flower Front Overlay */}
          {/* ------------------------------------------------ */}

          {flowers.map((flower) => (
            <FlowerFrontOverlay key={`front-${flower.id}`} flower={flower} />
          ))}

          {/* ------------------------------------------------ */}
          {/* Transformer */}
          {/* ------------------------------------------------ */}

          <Transformer
            ref={transformerRef}
            rotateEnabled
            keepRatio
            flipEnabled
            anchorSize={28}
            borderStrokeWidth={3}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 30 || newBox.height < 30) {
                return oldBox;
              }

              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Editable Flower
|--------------------------------------------------------------------------
*/

type EditableFlowerProps = {
  flower: FlowerItem;

  selected: boolean;

  onSelect: () => void;

  onChange: (updates: Partial<FlowerItem>) => void;

  nodeRef?: React.RefObject<Konva.Image | null>;
};

function EditableFlower({
  flower,
  selected,
  onSelect,
  onChange,
  nodeRef,
}: EditableFlowerProps) {
  const image = useImage(flower.image_url);

  if (!image) {
    return null;
  }

  return (
    <KonvaImage
      ref={selected ? nodeRef : undefined}
      image={image}
      x={flower.x}
      y={flower.y}
      width={flower.width}
      height={flower.height}
      offsetX={flower.width / 2}
      offsetY={flower.height}
      rotation={flower.rotation}
      scaleX={flower.scaleX}
      scaleY={flower.scaleY}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(event) => {
        onChange({
          x: event.target.x(),

          y: event.target.y(),
        });
      }}
      onTransformEnd={(event) => {
        const node = event.target;

        onChange({
          x: node.x(),

          y: node.y(),

          rotation: node.rotation(),

          scaleX: node.scaleX(),

          scaleY: node.scaleY(),
        });
      }}
    />
  );
}

/*
|--------------------------------------------------------------------------
| Flower Front Overlay
|--------------------------------------------------------------------------
*/

type FlowerFrontOverlayProps = {
  flower: FlowerItem;
};

function FlowerFrontOverlay({ flower }: FlowerFrontOverlayProps) {
  const image = useImage(flower.image_url);

  if (!image) {
    return null;
  }

  const frontRatio = getFlowerFrontRatio(flower.name);

  const sourceHeight = image.naturalHeight * frontRatio;

  const displayedHeight = flower.height * frontRatio;

  return (
    <Group
      x={flower.x}
      y={flower.y}
      rotation={flower.rotation}
      scaleX={flower.scaleX}
      scaleY={flower.scaleY}
      listening={false}
    >
      <KonvaImage
        image={image}
        x={-flower.width / 2}
        y={-flower.height}
        width={flower.width}
        height={displayedHeight}
        crop={{
          x: 0,
          y: 0,

          width: image.naturalWidth,

          height: sourceHeight,
        }}
        listening={false}
      />
    </Group>
  );
}

function getFlowerFrontRatio(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("hydrangea")) {
    return 0.48;
  }

  if (normalized.includes("small")) {
    return 0.6;
  }

  return DEFAULT_FLOWER_FRONT_RATIO;
}

/*
|--------------------------------------------------------------------------
| Vase Front
|--------------------------------------------------------------------------
*/

type VaseFrontProps = {
  image: HTMLImageElement;
  rect: Rect;
};

function VaseFront({ image, rect }: VaseFrontProps) {
  const rimCenterX = rect.x + rect.width / 2;

  const rimY = rect.y + rect.height * VASE_RIM_Y_RATIO;

  const rimWidth = rect.width * VASE_RIM_WIDTH_RATIO;

  const rimDepth = rect.height * VASE_RIM_DEPTH_RATIO;

  const left = rimCenterX - rimWidth / 2;

  const right = rimCenterX + rimWidth / 2;

  return (
    <Group
      listening={false}
      clipFunc={(ctx) => {
        ctx.beginPath();

        ctx.moveTo(rect.x, rect.y + rect.height);

        ctx.lineTo(rect.x, rimY);

        ctx.lineTo(left, rimY);

        ctx.bezierCurveTo(
          left + rimWidth * 0.18,

          rimY + rimDepth,

          right - rimWidth * 0.18,

          rimY + rimDepth,

          right,
          rimY,
        );

        ctx.lineTo(rect.x + rect.width, rimY);

        ctx.lineTo(
          rect.x + rect.width,

          rect.y + rect.height,
        );

        ctx.closePath();
      }}
    >
      <KonvaImage
        image={image}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        listening={false}
      />
    </Group>
  );
}

/*
|--------------------------------------------------------------------------
| Reconcile Flower Layout
|--------------------------------------------------------------------------
|
| الورود القديمة لا تتحرك.
|
| الورد الجديد فقط يضاف
| في الـ staging area.
|
*/

function reconcileFlowerLayout(
  currentFlowers: FlowerItem[],
  slots: FlowerSlot[],
): FlowerItem[] {
  const desiredInstances = createStableFlowerInstances(slots);

  const desiredMap = new Map(
    desiredInstances.map((flower) => [flower.id, flower]),
  );

  const currentIds = new Set(currentFlowers.map((flower) => flower.id));

  /*
   * حافظ على كل الورد الموجود.
   */
  const existingFlowers = currentFlowers
    .filter((flower) => desiredMap.has(flower.id))
    .map((flower) => {
      const latest = desiredMap.get(flower.id);

      if (!latest) {
        return flower;
      }

      return {
        ...flower,

        variant_id: latest.variant_id,

        name: latest.name,

        image_url: latest.image_url,
      };
    });

  /*
   * الورود الجديدة فقط.
   */
  const newInstances = desiredInstances.filter(
    (flower) => !currentIds.has(flower.id),
  );

  if (newInstances.length === 0) {
    return existingFlowers;
  }

  /*
   * كل وردة جديدة تظهر
   * في Staging Area.
   */
  const newFlowers = newInstances.map((flower, newIndex) =>
    createFlowerInSpawnArea(
      flower,

      /*
       * يخلي أكثر من وردة جديدة
       * لا تظهر فوق بعضها.
       */
      existingFlowers.length + newIndex,
    ),
  );

  /*
   * الورود الجديدة فوق القديمة
   * في الـ z-order.
   */
  return [...existingFlowers, ...newFlowers];
}

/*
|--------------------------------------------------------------------------
| Stable Flower Instances
|--------------------------------------------------------------------------
*/

function createStableFlowerInstances(
  slots: FlowerSlot[],
): StableFlowerInstance[] {
  const groups = slots.map((slot) =>
    Array.from(
      {
        length: slot.qty,
      },
      (_, occurrenceIndex) => ({
        id: `${slot.variant_id}-${occurrenceIndex}`,

        variant_id: slot.variant_id,

        name: slot.name,

        image_url: slot.image_url,
      }),
    ),
  );

  const result: StableFlowerInstance[] = [];

  let hasItems = true;

  while (hasItems) {
    hasItems = false;

    for (const group of groups) {
      const item = group.shift();

      if (!item) {
        continue;
      }

      result.push(item);

      hasItems = true;
    }
  }

  return result;
}

/*
|--------------------------------------------------------------------------
| Initial Flowers
|--------------------------------------------------------------------------
|
| حتى الورود الموجودة عند فتح
| الخطوة لأول مرة تظهر خارج الفازة.
|
*/

function createInitialFlowers(slots: FlowerSlot[]): FlowerItem[] {
  const flowers = createStableFlowerInstances(slots);

  return flowers.map((flower, index) => createFlowerInSpawnArea(flower, index));
}

/*
|--------------------------------------------------------------------------
| Create Flower In Spawn Area
|--------------------------------------------------------------------------
|
| دي النقطة الأساسية الجديدة.
|
| بدل ما الوردة تتحط داخل الفازة،
| بنحطها أعلى الـ canvas.
|
*/

function createFlowerInSpawnArea(
  flower: StableFlowerInstance,
  index: number,
): FlowerItem {
  /*
   * نستخدم cycle عشان لو المستخدم
   * أضاف ورد كتير، المناطق تتكرر.
   */
  const slotIndex = index % (SPAWN_AREA_COLUMNS * 2);

  const column = slotIndex % SPAWN_AREA_COLUMNS;

  const row = Math.floor(slotIndex / SPAWN_AREA_COLUMNS);

  const x = SPAWN_AREA_START_X + column * SPAWN_AREA_GAP_X;

  const y = SPAWN_AREA_START_Y + row * SPAWN_AREA_GAP_Y;

  /*
   * اختلاف بسيط في الحجم
   * والدوران حتى لا تظهر
   * كل الصور متطابقة.
   */
  const height = SPAWN_FLOWER_HEIGHT + variation(index + 50, 15);

  const width = height * 0.55;

  const rotation = variation(index + 100, 6);

  return {
    id: flower.id,

    variant_id: flower.variant_id,

    name: flower.name,

    image_url: flower.image_url,

    x,
    y,

    width,
    height,

    rotation,

    scaleX: 1,
    scaleY: 1,
  };
}

/*
|--------------------------------------------------------------------------
| Variation
|--------------------------------------------------------------------------
*/

function variation(index: number, amount: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;

  const normalized = value - Math.floor(value);

  return normalized * amount * 2 - amount;
}

/*
|--------------------------------------------------------------------------
| Vase Rect
|--------------------------------------------------------------------------
*/

function getVaseRect(image: HTMLImageElement | null): Rect {
  if (!image) {
    return {
      x: 160,
      y: 500,

      width: VASE_WIDTH,

      height: 400,
    };
  }

  const width = VASE_WIDTH;

  const ratio = image.naturalHeight / image.naturalWidth;

  const height = width * ratio;

  return {
    width,
    height,

    x: (DESIGN_WIDTH - width) / 2,

    y: DESIGN_HEIGHT - VASE_BOTTOM - height,
  };
}

/*
|--------------------------------------------------------------------------
| Image Loader
|--------------------------------------------------------------------------
*/

function useImage(src: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImage(null);

      return;
    }

    const img = new window.Image();

    img.onload = () => {
      setImage(img);
    };

    img.onerror = (error) => {
      console.error("Failed to load image:", src, error);

      setImage(null);
    };

    img.src = src;

    return () => {
      img.onload = null;

      img.onerror = null;
    };
  }, [src]);

  return image;
}
