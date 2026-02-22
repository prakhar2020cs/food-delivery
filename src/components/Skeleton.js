import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
    return (
        <div
            className={`${styles.skeleton} ${className}`}
            style={{
                width: width || '100%',
                height: height || '20px',
                borderRadius: borderRadius || '4px',
            }}
        />
    );
};

export const SkeletonCard = () => {
    return (
        <div className={styles.cardSkeleton}>
            <div className={styles.content}>
                <Skeleton width="70%" height="24px" borderRadius="6px" />
                <Skeleton width="40%" height="14px" />
                <div style={{ marginTop: '8px' }}>
                    <Skeleton width="95%" height="16px" />
                    <Skeleton width="85%" height="16px" />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <Skeleton width="60px" height="32px" borderRadius="8px" />
                    <Skeleton width="60px" height="32px" borderRadius="8px" />
                </div>
            </div>
        </div>
    );
};

export const SkeletonRow = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 0' }}>
        <Skeleton width="30%" height="12px" />
        <Skeleton width="60%" height="20px" />
    </div>
);

export const SkeletonProfile = () => {
    return (
        <div className={styles.cardSkeleton} style={{ flexDirection: 'row', gap: '40px', padding: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minWidth: '200px' }}>
                <Skeleton width="120px" height="120px" borderRadius="50%" />
                <Skeleton width="100px" height="32px" borderRadius="8px" />
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <Skeleton width="120px" height="40px" borderRadius="8px" />
                    <Skeleton width="120px" height="40px" borderRadius="8px" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
