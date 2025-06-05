import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import styles from './About.module.scss';

export function About() {
  const { t } = useTranslation();
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={styles.about_us}>
      <div className={styles.about_us_container}>
        <Breadcrumbs items={breadcrumbs} />
        <div className={styles.about_us_heading}>
          <h1 className={styles.about_us_heading_title}>
            {t('breadcrumbs.about_us')}
          </h1>
          <p className={styles.about_us_heading_text}>
            <span className={styles.about_us_heading_text_title}>
              {'<<PROTOUCH UZ>>'} —
            </span>{' '}
            {t('about_us.titleText')}.
            <br />
            <br />

            {/* First list  */}
            <span className={styles.about_us_heading_text_title}>
              {t('about_us.suggestionText')}:
            </span>
            <br />
            <br />• {t('about_us.suggestionInteractivePanels')}
            <br />• {t('about_us.suggestionConference')}
            <br />• {t('about_us.suggestionLedDisplay')}
            <br />• {t('about_us.suggestionServer')}
            <br />• {t('about_us.suggestionIP')}
            <br />• {t('about_us.suggestionCentre')}
            <br />• {t('about_us.suggestionOP')}
            <br />• {t('about_us.suggestionQueue')}
            <br />• {t('about_us.suggestionPlace')}

            {/* Second list */}
            <br />
            <br />
            {t('about_us.adviceText')}
            <br />
            {t('about_us.adviceTextPart')}.
            <br />
            <br />
            <span className={styles.about_us_heading_text_title}>
            {t('about_us.advantageText')}:
            </span>
            <br />
            • {t('about_us.successProjects')}
            <br />
            • {t('about_us.governmentText')}
            <br />
            • {t('about_us.deliveryText')}
            <br />
            • {t('about_us.teamText')}
            <br />
            • {t('about_us.dealText')}
            <br />
            <br />
            {t('about_us.successEndText')}.
            <br />
            <br />
            <span className={styles.about_us_heading_text_title}>
              {'<<PROTOUCH UZ>>'} — {' '}
            </span>{t('about_us.successEndTextPart')}
          </p>
        </div>
      </div>
    </div>
  );
}
