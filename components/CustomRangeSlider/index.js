import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './CustomRangeSlider.module.scss';

const CustomRangeSlider = ({ minValue, maxValue, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(null);
  const trackRef = useRef(null);
  const minSliderRef = useRef(null);
  const maxSliderRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !trackRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = minValue + percentage * (maxValue - minValue);

    if (isDragging === 'min') {
      const clampedValue = Math.min(newValue, value.max);
      const newMin = Math.round(clampedValue);
      if (newMin !== value.min) {
        onChange({ min: newMin, max: value.max });
      }
    } else if (isDragging === 'max') {
      const clampedValue = Math.max(newValue, value.min);
      const newMax = Math.round(clampedValue);
      if (newMax !== value.max) {
        onChange({ min: value.min, max: newMax });
      }
    }
  }, [isDragging, minValue, maxValue, value, onChange]);

  const handleMouseUp = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !trackRef.current) return;

    const touch = e.touches[0];
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const newValue = minValue + percentage * (maxValue - minValue);

    if (isDragging === 'min') {
      const clampedValue = Math.min(newValue, value.max);
      onChange({ min: Math.round(clampedValue), max: value.max });
    } else if (isDragging === 'max') {
      const clampedValue = Math.max(newValue, value.min);
      onChange({ min: value.min, max: Math.round(clampedValue) });
    }
  }, [isDragging, minValue, maxValue, value, onChange]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', handleMouseMove, true);
      document.addEventListener('mousemove', handleMouseMove, true);
      document.addEventListener('mouseup', handleMouseUp, true);
      document.addEventListener('pointerup', handleMouseUp, true);
      document.addEventListener('touchmove', handleTouchMove, true);
      document.addEventListener('touchend', handleTouchEnd, true);

      return () => {
        document.removeEventListener('pointermove', handleMouseMove, true);
        document.removeEventListener('mousemove', handleMouseMove, true);
        document.removeEventListener('mouseup', handleMouseUp, true);
        document.removeEventListener('pointerup', handleMouseUp, true);
        document.removeEventListener('touchmove', handleTouchMove, true);
        document.removeEventListener('touchend', handleTouchEnd, true);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Добавляем прямые обработчики событий к DOM элементам, чтобы обойти UIKit
  useEffect(() => {
    const minSlider = minSliderRef.current;
    const maxSlider = maxSliderRef.current;
    const track = trackRef.current;

    const handleMinPointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging('min');
    };

    const handleMaxPointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging('max');
    };

    const handleDirectTrackClick = (e) => {
      if (e.target === minSlider || e.target === maxSlider) {
        return;
      }

      e.stopPropagation();

      const rect = track.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const clickValue = minValue + percentage * (maxValue - minValue);

      const distToMin = Math.abs(clickValue - value.min);
      const distToMax = Math.abs(clickValue - value.max);

      if (distToMin < distToMax) {
        onChange({ min: Math.round(clickValue), max: value.max });
      } else {
        onChange({ min: value.min, max: Math.round(clickValue) });
      }
    };

    if (minSlider) {
      minSlider.addEventListener('pointerdown', handleMinPointerDown, true);
      minSlider.addEventListener('mousedown', handleMinPointerDown, true);
    }

    if (maxSlider) {
      maxSlider.addEventListener('pointerdown', handleMaxPointerDown, true);
      maxSlider.addEventListener('mousedown', handleMaxPointerDown, true);
    }

    if (track) {
      track.addEventListener('click', handleDirectTrackClick, true);
    }

    return () => {
      if (minSlider) {
        minSlider.removeEventListener('pointerdown', handleMinPointerDown, true);
        minSlider.removeEventListener('mousedown', handleMinPointerDown, true);
      }
      if (maxSlider) {
        maxSlider.removeEventListener('pointerdown', handleMaxPointerDown, true);
        maxSlider.removeEventListener('mousedown', handleMaxPointerDown, true);
      }
      if (track) {
        track.removeEventListener('click', handleDirectTrackClick, true);
      }
    };
  }, [minValue, maxValue, value, onChange]);

  const handlePointerDown = (thumb) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(thumb);
  };

  const getPositionPercentage = (val) => {
    return ((val - minValue) / (maxValue - minValue)) * 100;
  };

  const minPosition = getPositionPercentage(value.min);
  const maxPosition = getPositionPercentage(value.max);

  return (
    <div className={styles['custom-range-slider']} data-uk-slider="false">
      <div
        className={styles['custom-range-slider__track-container']}
        ref={trackRef}
        data-uk-slider="false"
      >
        <div className={styles['custom-range-slider__track-background']} />
        <div
          className={styles['custom-range-slider__track-active']}
          style={{
            left: `${minPosition}%`,
            width: `${maxPosition - minPosition}%`
          }}
        />
        <div
          ref={minSliderRef}
          className={styles['custom-range-slider__slider']}
          style={{ left: `${minPosition}%` }}
          onPointerDown={handlePointerDown('min')}
        />
        <div
          ref={maxSliderRef}
          className={styles['custom-range-slider__slider']}
          style={{ left: `${maxPosition}%` }}
          onPointerDown={handlePointerDown('max')}
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
