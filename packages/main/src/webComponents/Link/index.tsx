import { LinkDesign } from '@ui5/webcomponents-react/dist/LinkDesign';
import { withWebComponent, WithWebComponentPropTypes } from '@ui5/webcomponents-react/dist/withWebComponent';
import { WrappingType } from '@ui5/webcomponents-react/dist/WrappingType';
import { FC, ReactNode, MouseEventHandler } from 'react';

import '@ui5/webcomponents/dist/Link';

export interface LinkPropTypes extends Omit<WithWebComponentPropTypes, 'onClick'> {
  /**
   * Sets the accessible aria name of the component.
   */
  accessibleName?: string;
  /**
   * Defines the component design.
   *
   * **Note:** Avaialble options are `Default`, `Subtle`, and `Emphasized`.
   */
  design?: LinkDesign;
  /**
   * Defines whether the component is disabled.
   *
   * **Note:** When disabled, the component cannot be triggered by the user.
   */
  disabled?: boolean;
  /**
   * Defines the component href.
   *
   * **Note:** Standard hyperlink behavior is supported.
   */
  href?: string;
  /**
   * Defines the component target.
   *
   * **Notes:**
   *
   * *   `_self`
   * *   `_top`
   * *   `_blank`
   * *   `_parent`
   * *   `_search`
   *
   * **This property must only be used when the `href` property is set.**
   */
  target?: string;
  /**
   * Defines how the text of a component will be displayed when there is not enough space. Available options are:
   *
   * *   `None` - The text will be truncated with an ellipsis.
   * *   `Normal` - The text will wrap. The words will not be broken based on hyphenation.
   */
  wrappingType?: WrappingType;
  /**
   * Defines the text of the component.
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the component is triggered either with a mouse/tap or by using the Enter key.
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * The `Link` is a hyperlink component that is used to navigate to other apps and web pages, or to trigger actions. It is a clickable text element, visualized in such a way that it stands out from the standard text. On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Link" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Link: FC<LinkPropTypes> = withWebComponent<LinkPropTypes>(
  'ui5-link',
  ['accessibleName', 'design', 'href', 'target', 'wrappingType'],
  ['disabled'],
  [],
  ['click']
);

Link.displayName = 'Link';

Link.defaultProps = {
  design: LinkDesign.Default,
  disabled: false,
  wrappingType: WrappingType.None
};

export { Link };
